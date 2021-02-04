import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

let selectedFile = null;

const fileSelectedHandler = event => {
    console.log(event.target.files)
    selectedFile = event.target.files[0];
}


const onFileUpload = () => { 
     
    // Create an object of formData 
    const formData = new FormData(); 
   
    // Update the formData object 
    formData.append( 
        "myFile", 
        selectedFile,
        selectedFile.name,
    ); 
   
   
    // Request made to the backend api 
    // Send formData object 
    axios.post('api/uploadfile', formData)
    .then(res => {
        console.log(res);
    })
    .catch(e => {
        console.log(e);
    }) 
  }; 

const addToDB = (user, email, itemName, description, numItems) => {

    const requestOptions = {
        
       
            title: itemName,
            user,
            email,
            description,
            stock: numItems,
            picture: `${selectedFile.name}`
        
    }
     
    axios.post('/api/inventory/add', requestOptions)
    .then(res => {
        console.log(res);
    })
    .catch(e => {
        console.log(e);
    })
    
};

const AddItem = ({	
    email,
    user,
	dispatch,
}) => { 

    const [itemName, setItemName] = React.useState('');
    const [itemDescription, setItemDescription] = React.useState('');
    const [numItems, setNumItems] = React.useState('');
    
	return (
		<div> 
            <h1> 
              Upload New Item For Sale 
            </h1>  
            <div> 
                <input type="file" onChange={fileSelectedHandler}/> 
                <input type="text" placeholder="New Item Name" onChange={ e => setItemName(e.target.value)}/>
                <input type="text" placeholder="New Item description"  onChange={ e => setItemDescription(e.target.value)}/>
                <input type="text" placeholder="Number of items"  onChange={ e => setNumItems(e.target.value)}/>
                <button onClick={() => {onFileUpload(); addToDB(user, email, itemName, itemDescription, numItems);}}> 
                  Upload! 
                </button> 
            </div> 
        </div> 
	);
};

// Step 2 create mapping function
const mapStateToProps = state => ({
    email: state.userReducer.email,
    user: state.userReducer.user
});

// step 3 connect mapping function to component
export default connect(mapStateToProps)(AddItem);