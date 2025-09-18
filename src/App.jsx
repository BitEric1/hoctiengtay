import { useEffect, useState } from "react";
import { Button, Form, ListGroup, Modal } from "react-bootstrap";

import "./index.css";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";

function App() {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos/")
            .then((res) => res.json())
            .then((data) => setTasks(data));
    }, []);

    return (
        <>
            <div className="App">
                <h1 className="text-3xl font-bold underline text-center">
                    Hello world!
                </h1>
                <h2 className="text-2xl font-bold underline text-center">
                    Edit <code>src/App.jsx</code> and save to test HMR Edit{" "}
                    <code>src/App.jsx</code> and save to test HMR
                </h2>
                <p className="text-2xl font-black text-center text-blue-600">
                    Vẫn phải có một file css mới đc :))
                </p>
                <div className="card">
                    {/* <button onClick={() => setCount((count) => count + 1)}>
                        count is {count}
                    </button> */}
                    <p className="read-the-docs text-center">
                        Click on the Vite and React logos to learn more
                    </p>
                </div>
            </div>
            <Button
                variant="primary"
                onClick={handleShow}
            >
                Launch static backdrop modal
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    I will not close if you click outside me. Do not even try to
                    press escape key.
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
            <button
                type="button"
                className="btn btn-outline-primary"
            >
                Primary
            </button>
            <Form>
                <Form.Group
                    className="mb-3"
                    controlId="formBasicEmail"
                >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group
                    className="mb-3"
                    controlId="formBasicPassword"
                >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                    />
                </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId="formBasicCheckbox"
                >
                    <Form.Check
                        type="checkbox"
                        label="Check me out"
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                >
                    Submit
                </Button>
            </Form>
            <div className="pt-4">
                <ListGroup as="ul">
                    {tasks.map((task, index) => {
                        return (
                            <ListGroup.Item
                                key={index}
                                as="li"
                            >
                                {task.title}
                            </ListGroup.Item>
                        );
                    })}
                    <ListGroup.Item
                        as="li"
                        active
                    >
                        Cras justo odio
                    </ListGroup.Item>
                </ListGroup>
            </div>
        </>
    );
}

export default App;
