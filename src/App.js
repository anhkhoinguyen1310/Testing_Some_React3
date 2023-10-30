import {Navbar, Nav, NavDropdown, Button, Row, Col, Stack} from "react-bootstrap";
import {useEffect, useState, useCallback} from 'react'
import './App.css';
import rock from "./Images/rock.png";
import paper from "./Images/paper.png";
import scissors from "./Images/scissors.png";


function NavBarr () {
  return (
<Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">Rock Paper Scissor</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#link">Link</Nav.Link>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="   #action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider/>
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
</Navbar>
  )
}

const ChoiceCard = (props) => {
  console.log("Props:", props);
  return (
    <div className={`choice-card 
 ${props.winner === "Win" ? "border-success" : (props.winner === "Loss" ? "border-danger" : "border-dark")}`}>
      <p>{props.title}</p>
      <img src={props.shape === 'rock' ? rock : props.shape === 'paper' ? paper : scissors} alt={props.shape} />
      <p>{props.winner === 'Win' ? 'WIN' : props.winner === 'tie' ? 'TIE' : 'LOSS'}</p>
    </div >        
  );
};

function App() {
  const shapes = ["rock", "paper", "scissors"];
  
  const [playerChoice, setPlayerChoice] = useState(null);
  const [playerResult, setPlayerResult] = useState(null);
  
  const [computerChoice, setcomputerChoice] = useState(null);
  const [computerResult, setcomputerResult] = useState(null);
  const [gameHistory, setGameHistory] = useState ([])


  const [outcome, setOutcome] = useState('Make A Choice!!!');
  

  const calculateWinner = useCallback(() => {
    if (computerChoice === playerChoice) {
        setOutcome('Tie');
        setcomputerResult('tie');
        setPlayerResult('tie');
        setGameHistory(prevHistory => [
            ...prevHistory,
            {
                winner: 'Tie',
                playerChoice: playerChoice,
                computerChoice: computerChoice,
            }
        ]);
        return;
    }

    const winningCombos = {
        rock: 'scissors',
        paper: 'rock',
        scissors: 'paper'
    };

    if (winningCombos[computerChoice] === playerChoice) {
        setOutcome('Computer Won');
        setcomputerResult('Win');
        setPlayerResult('Loss');
        setGameHistory(prevHistory => [
            ...prevHistory,
            {
                winner: 'Computer Won',
                playerChoice: playerChoice,
                computerChoice: computerChoice,
            }
        ]);
    } else {
        setOutcome('Player Won');
        setcomputerResult('Loss');
        setPlayerResult('Win');
        setGameHistory(prevHistory => [
            ...prevHistory,
            {
                winner: 'Player Won',
                playerChoice: playerChoice,
                computerChoice: computerChoice,
            }
        ]);
    }
}, [playerChoice, computerChoice]);

  
  const play = (choice) => {
    setPlayerChoice(choice);  
    setcomputerChoice(shapes[Math.floor(Math.random() * 3)]);
  };

useEffect(() => { 
  calculateWinner(playerChoice, computerChoice);

}, [playerChoice, computerChoice, calculateWinner])
  return (
    <div className="App">
      <NavBarr/>
      <h1 className="styleH1">{outcome}</h1>
      <div className="d-flex justify-content-center flex-wrap">
       <Row>
        <Col>
        <ChoiceCard title="You" winner={playerResult} shape={playerChoice}/>
        <Stack direction="horizontal" gap={3}>
        <Button onClick={() => play('rock') }>Rock</Button>
        <Button onClick={() => play('paper') }>Paper</Button>
        <Button onClick={() => play('scissors') }>Scissor</Button>
        </Stack>
        </Col>
        <Col> <ChoiceCard title="Computer" winner={computerResult} shape={computerChoice} /></Col>
       </Row>
<ul>
  {gameHistory.map((g,i)=>{
    return <li key={i}>
      Game Number: {i+1} winner: {g.winner}, playerChoice: {g.playerChoice}, computerChoice: {g.computerChoice}
    </li>
  })}
</ul>

      </div>
    </div >
  );

};
export default App;