import './App.css';

import { useState, useEffect } from 'react'

import axios from 'axios';

import Spinner from 'react-spinner-material';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import BootstrapTable from 'react-bootstrap-table-next'
import filterFactory, { textFilter, numberFilter  } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator'


function App() {
  const [gloves, setGloves] = useState();
  const [facemasks, setFacemasks] = useState();
  const [beanies, setBeanies] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get('/api');
      const data = await res.data

      setGloves(data['gloves']);
      setFacemasks(data['facemasks']);
      setBeanies(data['beanies']);
    }

    fetchProducts();
  }, [gloves, facemasks, beanies])

  // table columns config
  const columns = [{
    dataField: 'id',
    text: 'ID',
    filter: textFilter()
  }, {
    dataField: 'name',
    text: 'Name',
    filter: textFilter()
  }, {
    dataField: 'color',
    text: 'Color',
    filter: textFilter()
  }, {
    dataField: 'price',
    text: 'Price',
    filter: numberFilter()
  }, {
    dataField: 'manufacturer',
    text: 'Manufacturer',
    filter: textFilter()
  }, {
    dataField: 'availability',
    text: 'Availability',
    filter: textFilter(),
    style: function callback(cell, row, rowIndex, colIndex) {
      if (cell === "INSTOCK") {
        return ({ backgroundColor: "#5cb85c" })

      } else if (cell === "LESSTHAN10") {
        return ({ backgroundColor: "#f0ad4e" })

      } else {
        return ({ backgroundColor: "#d9534f"})
      }
    }
  }];

  // pagination config
  const pagination = paginationFactory({
    firstPageText: 'First',
    lastPageText: 'Last',
  });

  // displaying text and wait for data to be rendered
  const noDataIndication = () => {
    return <h3 className="text-center"></h3>
  }
  
  // if (gloves && facemasks && beanies){
  //   return (
  //     <div className="container">
  //       <Tabs defaultActiveKey="gloves" id="uncontrolled-tab">
  //         <Tab eventKey="gloves" title="Gloves">
  //           <BootstrapTable keyField="id" data={ gloves } columns={ columns } pagination={ pagination } filter={ filterFactory() } noDataIndication= { noDataIndication }/>
  //         </Tab>

  //         <Tab eventKey="facemasks" title="Facemasks">
  //           <BootstrapTable keyField="id" data={ facemasks } columns={columns} pagination={ pagination } filter={ filterFactory() } />
  //         </Tab>

  //         <Tab eventKey="beanies" title="Beanies">
  //           <BootstrapTable keyField="id" data={ beanies } columns={columns} pagination={ pagination } filter={ filterFactory() } />
  //         </Tab>
  //       </Tabs> 
  //     </div>
  //   )
  // }

  // return (
    // <div className="container">   
    //   <div className='spinner'>
    //     <Spinner size={120}  visible={true} />
    //   </div>
    //   <h2 className='text-center'>It might take 30 seconds to 1 minutes to fetch the API successfully. Don't lose your patience :)</h2>
    // </div>
  // );

  return (
    <div className="container">
      {
        (gloves && facemasks && beanies) ?   
          <Tabs defaultActiveKey="gloves" id="uncontrolled-tab">
            <Tab eventKey="gloves" title="Gloves">
              <BootstrapTable keyField="id" data={ gloves } columns={ columns } pagination={ pagination } filter={ filterFactory() } noDataIndication= { noDataIndication }/>
            </Tab>

            <Tab eventKey="facemasks" title="Facemasks">
              <BootstrapTable keyField="id" data={ facemasks } columns={columns} pagination={ pagination } filter={ filterFactory() } />
            </Tab>

            <Tab eventKey="beanies" title="Beanies">
              <BootstrapTable keyField="id" data={ beanies } columns={columns} pagination={ pagination } filter={ filterFactory() } />
            </Tab>
          </Tabs> 
        :
          <div className="container">   
            <div className='spinner'>
              <Spinner size={120}   />
            </div>
            <h2 className='text-center'>It might take 30 seconds to 1 minutes to fetch the API successfully. Don't lose your patience :)</h2>
          </div>
      }
      

  </div>
  )
}

export default App;
