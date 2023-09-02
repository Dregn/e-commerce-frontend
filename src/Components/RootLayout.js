import React from 'react'
import { Outlet, useNavigation } from 'react-router-dom';
import Header  from './Header'
import { Container } from 'react-bootstrap';
import Footer from './Footer'
function RootLayout() {
  // const navigation = useNavigation();

  return (
    <>
       <div>
       <Header></Header>
      <main>
        <Container>
       <Outlet/>
        </Container>
       
      </main>
      <Footer></Footer>
      </div>
    </>
  );
}

export default RootLayout;


