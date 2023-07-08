import axios from 'axios';
import React , { Component } from 'react';
import MyContext from '../contexts/MyContext';

class CategoryDetail extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtName: ''
    };
  }
  render() {
    return (
      <div className='float-right'>
        <h2 className='text-center'>CATEGORY DETAIL</h2>
        <form>
          <table>
            <tbody>
              <tr>
                <td>ID</td>
                <td><input type='text' value={this.state.txtID} onChange={(e) => {
                  this.setState({txtID: e.target.value})
                }} readOnly={true}/></td>
              </tr>
              <tr>
                <td>NAME</td>
                <td><input type='text' value={this.state.txtName} onChange={(e) => {
                  this.setState({txtName: e.target.value})
                }}/></td>
              </tr>
                <td></td>
                <td>
                  <input type='submit' value='ADD NEW' onClick={(e) => this.btnAddClick(e)}/>
                  <input type='submit' value='UPDATE' onClick={(e) => this.btnUpdateClick(e)}/>
                  <input type='submit' value='DELETE'/>
                </td>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
  //
  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    if (id && name) {
      const cate = {name: name};
      this.apiPutCategory(id, cate);
    } else {
      alert('Please input id and name')
    }
  }
  //event-handlers
  btnAddClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    if(id && name) {
      const cate = {name: name};
      this.apiPutCategory(id, cate);
    } else {
      alert('Please input id and name');
    }
  }
  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('ARE YOU SURE?')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteCategory(id);
      } else {
        alert('Please input id');
      }
    }
  }
  //apis
  apiPostCategory(cate) {
    const config = {headers: {'x-access-token': this.context.token}};
    axios.put('/api/admin//categories/', cate, config).then((res) => {
      const result = res.data;
      if(result) {
        alert('OK BABY');
        this.apiGetCategories();
      } else {
        alert('SORRY BABY');
      }
    });
  }

  apiPutCategory(id, cate) {
    const config = {headers: {'x-access-token': this.context.token}};
    axios.put('/api/admin/categories/' + id, cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY');
        this.apiGetCategories();
      } else {
        alert('SORRY BABY!');
      }
    });
  }

  //
  apiGetCategories() {
    const config = {headers: {'x-access-token': this.context.token}};
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.props.updateCategories(result);
    });
  }
  
  apiDeleteCategory(id) {
    const config = {headers: {'x-access-token': this.context.token}};
    axios.delete('/api/admin/categories/' + id, config).then((res) => {
      const config = {headers: {'x-access-token': this.context.token}};
      axios.delete('/api/admin/categories/' + id, config).then((res) => {
        const result = res.data;
        if (result) {
          alert('OK BABY');
          this.apiGetCategories();
        } else {
          alert('SORRY BABY');
        }
      })
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({txtID: this.props.item._id, txtName: this.props.item.name});
    }
  }
}
export default CategoryDetail;
