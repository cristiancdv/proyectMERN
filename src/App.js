
import './App.css';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Public from './Routes/Public';
import Admin from './Routes/Admin';
import AuthProvider from './Context/AuthProvider';
import AuthContext from './Context/AuthContext';
import PageProvider from './Context/PageProvider';
import MarketProvider from './Context/MarketProvider';



import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";// eslint-disable-next-line


function App() {

  return (
    <div className="App">


      <Router>
        <MarketProvider>
          <AuthProvider>

            <PageProvider>

              <Header />

            </PageProvider>

            < Switch >

              <AuthContext.Consumer>
                {(context) => {

                  return (

                    <>
                      {context.userLogin && (
                        <>
                          {
                            context.userInfo.rango === "2" && (
                              <Admin />
                            )
                          }

                          {context.userInfo.rango === "1" && (

                            <Public />

                          )}
                        </>
                      )}

                      {!context.userLogin && (
                        <Public />
                      )}

                    </>
                  )
                }
                }
              </AuthContext.Consumer>

            </Switch>

            <PageProvider>

              <Footer />

            </PageProvider>

          </AuthProvider>
        </MarketProvider>
      </Router>

    </div >
  );
}

export default App;
