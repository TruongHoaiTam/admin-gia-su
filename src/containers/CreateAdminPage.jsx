import React from 'react';
import Navbar from '../components/Navbar';
import RegisterForm from '../components/RegisterForm';

class CreateAdminPage extends React.Component {
  history = () => {
    const { history } = this.props;
    history.push('/login');
  };
  render() {
    return (
      <div>
        <Navbar />
        <p className="title">CREATE ADMIN</p>
        <RegisterForm history={this.history} />
      </div>
    );
  }
}

export default CreateAdminPage;
