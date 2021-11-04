import { 
  IonBackButton, 
  IonButton, 
  IonButtons, 
  IonContent, 
  IonDatetime, 
  IonHeader, 
  IonIcon, 
  IonInput, 
  IonItem, 
  IonLabel, 
  IonPage, 
  IonRadio, 
  IonRadioGroup, 
  IonSelect, 
  IonSelectOption, 
  IonTitle, 
  IonToolbar,
  IonToast,
} from '@ionic/react';
import { addCircle, trashSharp } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { 
  getStudentById, 
  deleteStudent, 
  updateStudent 
} from '../databaseHandler';
import { Student } from '../student';

interface MyParams {
  id: string
};

const Details: React.FC = () => {
  const { id } = useParams<MyParams>()

  const [name, setName] = useState<string>('')
  const [country, setCountry] = useState('')
  const [languages, setLanguages] = useState<string[]>([]);
  const [dateOfBirth, setDateOfBirth] = useState(new Date().toISOString());
  const [gender, setGender] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [headerMessage, setHeaderMessage] = useState('');
  const [message, setMessage] = useState('');
  const [colorMessage, setColorMessage] = useState('');

  const history = useHistory();

  const handleUpdate = () => {
    const idStudent = (Number.parseInt(id));

    const newStudent = {
      name: name, 
      country: country,
      languages: languages, 
      dateOfBirth: dateOfBirth, 
      gender: gender
    };

    updateStudent(newStudent, idStudent);

    setHeaderMessage('Success');
    setMessage('Update Successfully !');
    setColorMessage('success');
    setShowToast(true);

    setTimeout(()=>{
      setShowToast(false);
    }, 3000)  
  }
  function handleDelete() {
    const userConfirm = window.confirm("Are you sure to delete ?");

    if (userConfirm) {
      deleteStudent(Number.parseInt(id));

      setHeaderMessage('Success');
      setMessage('Delete Successfully !');
      setColorMessage('success');
      setShowToast(true);

      setTimeout(()=>{
        setShowToast(false);
      }, 3000)  
 
      history.goBack();
    } else {
      setHeaderMessage('Warning');
      setMessage('Delete have been cancelled !');
      setColorMessage('danger');
      setShowToast(true);

      setTimeout(()=>{
        setShowToast(false);
      }, 3000)  
    }
  }
  async function fetchData() {
    const student = await getStudentById(Number.parseInt(id)) as Student;

    setName(student.name);
    setCountry(student.country);
    setDateOfBirth(student.dateOfBirth);
    setLanguages(student.languages);
    setGender(student.gender);
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle color="warning">Details {name}</IonTitle>
          <IonButton onClick={handleDelete} size="small" color="danger" slot="end">
            <IonIcon slot="icon-only" icon={trashSharp}></IonIcon>
          </IonButton>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Name</IonLabel>
          <IonInput value={name} onIonChange={event => setName(event.detail.value!)}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Country</IonLabel>
          <IonSelect value={country} onIonChange={event => setCountry(event.detail.value)}>
          <IonSelectOption value="Vietnam">Vietnam</IonSelectOption>
            <IonSelectOption value="English">English</IonSelectOption>
            <IonSelectOption value="Japan">Japan</IonSelectOption>
            <IonSelectOption value="Korea">Korea</IonSelectOption>
            <IonSelectOption value="China">China</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Speakable Languages</IonLabel>
          <IonSelect value={languages} multiple={true} onIonChange={event => setLanguages(event.detail.value)}>
            <IonSelectOption value="Vietnamese">Vietnamese</IonSelectOption>
            <IonSelectOption value="English">English</IonSelectOption>
            <IonSelectOption value="Japan">Japanese</IonSelectOption>
            <IonSelectOption value="Korea">Korean</IonSelectOption>
            <IonSelectOption value="China">Chinese</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Date of Birth</IonLabel>
          <IonDatetime display-format="YYYY/MM/DD" onIonChange={event => setDateOfBirth(event.detail.value!)} value={dateOfBirth}></IonDatetime>
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Gender</IonLabel>
          <IonRadioGroup value={gender} onIonChange={event => setGender(event.detail.value)}>
            <IonItem>
              <IonLabel><small>👦 Male</small></IonLabel>
              <IonRadio value="Male"></IonRadio>
            </IonItem>
            <IonItem lines="none">
              <IonLabel><small>👧 Female</small></IonLabel>
              <IonRadio value="Female"></IonRadio>
            </IonItem>
          </IonRadioGroup>
        </IonItem>

        <IonButton color="warning" expand="block" onClick={handleUpdate} >
          📝 Update
        </IonButton>

        {/* Toast */}
        <IonToast isOpen={showToast} header={headerMessage} message={message} color={colorMessage} position="top"></IonToast>
      </IonContent>
    </IonPage>
  );
};

export default Details;