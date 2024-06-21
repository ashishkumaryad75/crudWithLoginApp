import { useState } from "react";
import TodoService from "../../services/Todo.service";

const Home = () => {
  //   const [result, setresult] = useState([]);
  //   let todoService = new TodoService();

  //   useEffect(() => {
  //     todoService.getData().then((response) => {
  //       let data = response.data;
  //       setresult(data);
  //       //   setDetails(response.data[1]);
  //     });
  //   }, []);

  return (
    <>
      <h1>home</h1>

      <div className="card" style="width: 18rem;">
        {/* <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p> */}
        {/* </div> */}
      </div>
    </>
  );
};
export default Home;
