import { 
  IonContent, 
  IonHeader, 
  IonItem, 
  IonList, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  useIonPicker,
  useIonViewWillEnter,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { getAllStudent } from '../databaseHandler'
import { Student } from '../student';

const Home: React.FC = () => {
  const [present] = useIonPicker();
  const [students, setStudents] = useState<Student[]>([])

  async function fetchData() {
    const allStudent = await getAllStudent();
    if (allStudent.length > 0) {
      setStudents(allStudent);
    } else {
      setStudents([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useIonViewWillEnter(() => {
    fetchData();
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home Page</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
          {students &&
            <IonList>
              {
                students.map((student, index) =>
                  <IonItem routerLink={`details/${student.id}`} button key={index}>{student.name}</IonItem>
                )
              }
            </IonList>
          }
      </IonContent>
    </IonPage>
  );
};

export default Home;