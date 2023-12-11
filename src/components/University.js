import React,{useState,useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Pagination from 'react-bootstrap/Pagination';
import { Spinner } from 'react-bootstrap';


const University = ({universities,country}) => {
  const itemsPerPage = 12;
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastUniversity = currentPage * itemsPerPage;
  const indexOfFirstUniversity = indexOfLastUniversity - itemsPerPage;
  const currentUniversities = universities.slice(indexOfFirstUniversity, indexOfLastUniversity);
  const totalPages = Math.ceil(universities.length / itemsPerPage);

  useEffect(() => {
    
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  
  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    
      <div>
        {loading ? (
          <Spinner animation="border" role="status" style={{"marginTop":"4"}}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) :(
     <div>
      <div style={{"text-align":"center"}}> <h2>{country.toUpperCase()}</h2> 
      <h3>universities in {country.toLowerCase()} are {universities.length}</h3>
      </div>
      <Row xs={1} md={2} lg={3} className="g-4" margin={2}>
        { currentUniversities.map((uni) => ((uni.name!=='ICFAI University' && uni.name!=='Pondicherry University') &&
          <Col key={uni.name}>
          <Card>
            <Card.Body>
              <Card.Title>{uni.name}</Card.Title>
              <Card.Text>
              <img src={`https://flagcdn.com/48x36/${(uni.alpha_two_code).toLowerCase()}.png`} />
               <a className="link" style={{"textDecoration":"none"}} onClick={()=>window.open( uni.web_pages[0])}> {uni.web_pages[0]}</a>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        ))
      
      } 
         </Row>
         <br />
         { currentUniversities.length>0 &&

         <Pagination className="justify-content-center">
         <Pagination.First onClick={handleFirstPage} />
          <Pagination.Prev onClick={handlePrevPage} />
          
            <Pagination.Item>
              {currentPage}
            </Pagination.Item>
          
          <Pagination.Next onClick={handleNextPage} />
          <Pagination.Last onClick={handleLastPage} />
        </Pagination>}
      </div> )}

      </div>
    
  )
}

export default University