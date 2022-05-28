import axios from "axios";

 const Authrosiation = async()=>{

    const data = {"username":"lbbttujj","password":"admin"}
   await axios.post("http://localhost:8000/login",data)
    .then(ServerResponse => {
      console.clear();
      console.log(ServerResponse.data)
      return(true)
    })
    .catch(function (error) {
        console.clear();
        console.log(error);
        return(false)
    });
 

  
}

export default Authrosiation