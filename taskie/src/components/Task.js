import React, {useState, useEffect} from "react";
import firebase from "firebase";
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    border: 5,
  },
  title: {
    fontSize: 14,
  },
});


function Task(props) {
  
  const classes = useStyles();
  const {taskStatus} = props;

  const taskArray = [];
  const [task,setTask] = useState([]);
  
   useEffect(() => {
    firebase.firestore().collection('Task')
    .where("taskStatus", "==", props.taskStatus)
    //.orderBy("deadline")
    .get()
    .then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
        //doc.data();
        taskArray.push(doc.data());
      });
      setTask(taskArray);
   });
   }, []);

//       const [photo, setPhoto] = useState([]);
//       useEffect(() => {
//         firebase.firestore().collection('User').doc(taskArray.createdBy)
//         .get().then(function(doc) {
//             if (doc.exists) {
//                 console.log("Document data:", doc.data());
//             } else {
//                 // doc.data() will be undefined in this case
//                 console.log("No such document!");
//             }
//         }).catch(function(error) {
//             console.log("Error getting document:", error);
//         });
//       })


  //Rendering the Task card
  return (
    <div className="task-card">
      {
        task.map((taskObject, index) => {
          return(
            <div key = {`${index}`}>
              <br></br>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Title: {taskObject.taskTitle}
                  </Typography>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Created By: {taskObject.createdBy}
                  </Typography>
                  <Typography color="textSecondary">
                    Deadline: {taskObject.deadline}
                  </Typography>
                  <Typography variant="body2" component="p">
                  </Typography>
                </CardContent>
            </Card>
            </div>

          );
        })
      }
      {/* <div>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Created By: {task.createdBy}
            </Typography>
            <Typography variant="h5" component="h2">
              Title: {task.taskTitle}
            </Typography>
            <Typography color="textSecondary">
              Deadline: {task.deadline}
            </Typography>
            <Typography variant="body2" component="p">
            </Typography>
          </CardContent>
       </Card>
      </div> */}
    </div>
  );
}
export default Task;