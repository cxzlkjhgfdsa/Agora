import styled from "styled-components";

function Footer() {

  window.onscroll = function() {scrollFunction()};

  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("scroll-to-top-btn").style.display = "block";
    } else {
      document.getElementById("scroll-to-top-btn").style.display = "none";
    }
  }
  
  function scrollToTop() {
    console.log("button clicked")
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <Container>
      <p>© 2023 아고라</p>
      <p>created by &nbsp;
        <a href="https://www.instagram.com/dongind.oct" rel="noreferrer" target="_blank"> 김용현 </a>
        <a href="https://www.instagram.com/o_60__o" rel="noreferrer" target="_blank"> 오윤식 </a>
        <a href="https://www.instagram.com/hwihw1" rel="noreferrer" target="_blank"> 윤재휘 </a>
        <a href="https://www.instagram.com/s.wlli" rel="noreferrer" target="_blank"> 이상원 </a>
        <a href="https://www.instagram.com/seongheon742" rel="noreferrer" target="_blank"> 이승헌 </a>
        <a href="https://www.instagram.com/eukary_on" rel="noreferrer" target="_blank"> 전인덕 </a>
      </p>
      <Button id="scroll-to-top-btn" onClick={scrollToTop}>▲</Button>
    </Container>
  )
}

export default Footer;

const Container = styled.div`
  margin-bottom: 10rem;
  text-align: center;
` 

const Button = styled.button`
  display: none;
  position: fixed;
  bottom: 20px;
  right: 25px;
  background-color: #333;
  color: #fff;
  border-radius: 0.5rem;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 10px;
  font-size: 20px;
`