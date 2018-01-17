import React from "react";
// import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Header} from "semantic-ui-react";


const HomePage = () => (
    <div className="home-page" >
        <style>{`
      body > div,
      body > div > div,
      body > div > div > div.home-page {
        height: 100%;
      }
    `}</style>
        <Grid
            textAlign="center"
            style={{ height: "100%" }}
            verticalAlign='middle'
        >
        
            <Grid.Column style={{ maxWidth: 450 }}>

                <Header
                    as='h1'
                    content='TwitterSearch'
                    
                    color="blue"
                    style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0 }}
                />
                <Header
                    as='h2'
                    content='Search for tweets here, cause why use twitter?'
                    
                    color='black'
                    style={{ fontSize: '1.5em', fontWeight: 'normal' }}
                />
                <Link to="/login" style={{ fontSize: '1.5em', color:"green" }}> Login  </Link>
                or
                <Link to="/signup" style={{ fontSize: '1.5em', color: "red" }}> SignUp  </Link>  
            </Grid.Column>    
        </Grid>
    </div>
);

// HomePage.propTypes = {
//     isAuthenticated: PropTypes.bool.isRequired, 
//     logoutUser: PropTypes.func.isRequired
// };

// function mapStateToProps(state)
// {
//     return {
//         isAuthenticated: !!state.user.token
//     }
// }

// export default connect(mapStateToProps, { logoutUser: logout})(HomePage);
export default HomePage;