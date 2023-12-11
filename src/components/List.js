import React,{useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import University from './University';
import InfoToast from './toast';
import './list.css';

const List = () => {
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState('');
    const [country, setCountry] = useState("india");
  const [universities, setUniversities] = useState([]);
  const [highestCount, setHighestCount] = useState({});
  const [lowestCount, setLowestCount] = useState({});
  const [showStat,setShowStat] = useState(false);

  useEffect(() => {
    // Fetch universities based on country
    const fetchUniversities = async () => {
      try {
        var response;
        if(country==='india'){
         response = await fetch(
          `http://universities.hipolabs.com/search?country=india`
        );}
        else{
           response = await fetch(
                `http://universities.hipolabs.com/search?country=${country}`
              );}
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setUniversities(data);   
        // {error && <div>Error: {error.message}</div>}
      } catch (error) {
        setError(error);
        console.error("Error fetching data:", error);
      }
    };

    fetchUniversities();
  }, [country]);

  const handleSearch=(e) => {
     setCountry(searchValue);
 };

 const statShow=()=>{
  if(showStat){
    setShowStat(false);
  }else{
    setShowStat(true);
  }
 
    
  
 }

 useEffect(() => {
  // Fetch universities based on country
  const fetchStat = async () => {
    try {
      var response = await fetch(
        `http://universities.hipolabs.com/search?name=`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data[0]);
      // Find country with the highest and lowest number of universities
      const countryCounts = data.reduce((acc, uni) => {
        acc[uni.country] = (acc[uni.country] || 0) + 1;
        return acc;
      }, {});
      const countries = Object.keys(countryCounts);
      const highest = countries.reduce((a, b) =>
        countryCounts[a] > countryCounts[b] ? a : b
      );
      const lowest = countries.reduce((a, b) =>
        countryCounts[a] < countryCounts[b] ? a : b
      );
      setHighestCount({
        country: highest,
        count: countryCounts[highest]
      });
      setLowestCount({
        country: lowest,
        count: countryCounts[lowest]
      });
      setError(null);
    } catch (error) {
      setError(error);
      
    }
  };
  fetchStat();
}, []);





  return (
    <>
      <Navbar bg="dark" expand="lg" data-bs-theme="dark" >
      <Container fluid>
        <Navbar.Brand href="#"> <b>UniExplorer</b> </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link onClick={()=>statShow()}>STATS</Nav.Link>
            
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchValue}
              onChange={(e)=>setSearchValue(e.target.value)}
            />
            <Button variant="outline-success" onClick={handleSearch}>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar> 
   
     <div className = {`toast-overlay ${showStat ? 'show' : ''}`} > 
    {showStat &&(     
      <InfoToast highestCount={highestCount} lowestCount={lowestCount} /> )
}     </div>

     <University universities={universities} country={country} />
     
    </>
  )
}

export default List