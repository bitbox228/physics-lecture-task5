import React, {useEffect, useState} from 'react';
import Plot from 'react-plotly.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Col, Form, Button} from 'react-bootstrap';

const App = () => {

    const [l, setL] = useState(5)
    const [r, setR] = useState(5)
    const [eps, setEps] = useState(5)
    const [t, setT] = useState(10)

    const [x, setX] = useState()
    const [closeY, setCloseY] = useState()
    const [openY, setOpenY] = useState()

    const handleEpsChange = (e) => {
        setEps(e.target.value)
    }

    const handleRChange = (e) => {
        setR(e.target.value)
    }

    const handleLChange = (e) => {
        setL(e.target.value)
    }

    const handleTChange = (e) => {
        setT(e.target.value)
    }

    const checkForms = () => {
        if (l === '') {
            alert('Введите B')
            return false
        }
        if (eps === '') {
            alert('Введите ε')
            return false
        }
        if (r === '') {
            alert('Введите R')
            return false
        }
        if (t === '') {
            alert('Введите t')
            return false
        }

        if (l < 0) {
            alert('Введите неотрицательное L')
            return false
        }
        if (eps < 0) {
            alert('Введите неотрицательное &epsilon;')
            return false
        }
        if (r <= 0) {
            alert('Введите положительное R')
            return false
        }
        if (t <= 0) {
            alert('Введите положительное t')
            return false
        }

        return true
    }

    const handlePlotUpdate = () => {
        if (!checkForms()) {
            return
        }

        const step = t / 1000

        const newX = Array.from(
            {length: 1000},
            (_, index) => index * step
        )

        const i_0 = eps / r
        const tau = l / r

        const newOpenY = newX.map(index =>
            i_0 * Math.exp(-index / tau)
        )

        const newCloseY = newX.map(index =>
            i_0 * (1 - Math.exp(-index / tau))
        )

        setX(newX)
        setOpenY(newOpenY)
        setCloseY(newCloseY)
    }

    useEffect(() => {
        handlePlotUpdate()
    }, [])

    return (
        <div className={"container-fluid"}>
            <h1>Замыкание/размыкание цепи.</h1>
            <Row>
                <Col xs={12} md={3}>
                    <Form>
                        <div style={{marginBottom: '10px', marginTop: '70px'}}>
                            <Form.Group controlId="l">
                                <Form.Label>Индуктивность, L (Гн)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={l}
                                    onChange={handleLChange}
                                />
                            </Form.Group>
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <Form.Group controlId="r">
                                <Form.Label>Сопротивление, R (Ом)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={r}
                                    onChange={handleRChange}
                                />
                            </Form.Group>
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <Form.Group controlId="eps">
                                <Form.Label>ЭДС источника тока, &epsilon; (В)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={eps}
                                    onChange={handleEpsChange}
                                />
                            </Form.Group>
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <Form.Group controlId="eps">
                                <Form.Label>Время, t (с)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={t}
                                    onChange={handleTChange}
                                />
                            </Form.Group>
                        </div>
                        <div>
                            <Button variant="primary" onClick={handlePlotUpdate}>Построить графики</Button>
                        </div>
                    </Form>
                </Col>
                <Col xs={12} md={9}>
                    <Plot
                        data={[
                            {
                                x: x,
                                y: openY,
                                type: 'scatter',
                                mode: 'lines+points',
                                marker: {color: 'blue'},
                            },
                        ]}
                        layout={{
                            width: '800',
                            height: '420',
                            title: 'При размыкании цепи',
                            xaxis: {title: 'Время, с'},
                            yaxis: {title: 'Сила тока, А'}
                        }}
                    />
                    <Plot
                        data={[
                            {
                                x: x,
                                y: closeY,
                                type: 'scatter',
                                mode: 'lines+points',
                                marker: {color: 'blue'},
                            },
                        ]}
                        layout={{
                            width: '800',
                            height: '420',
                            title: 'При замыкании цепи',
                            xaxis: {title: 'Время, с'},
                            yaxis: {title: 'Сила тока, А'}
                        }}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default App
