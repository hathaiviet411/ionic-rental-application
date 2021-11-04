import { 
  IonButton, 
  IonContent, 
  IonDatetime, 
  IonHeader, 
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
import { useState } from 'react';
import { insertStudent } from '../databaseHandler'

const Register: React.FC = () => {
  const [name, setName] = useState<string>('')
  const [country, setCountry] = useState('')
  const [languages, setLanguages] = useState<string[]>([]);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [headerMessage, setHeaderMessage] = useState('');
  const [message, setMessage] = useState('');
  const [colorMessage, setColorMessage] = useState('');
  
  const registerClick = ()=>{
    const newStudent = {
      name: name,
      country: country,
      languages: languages,
      dateOfBirth: dateOfBirth,
      gender: gender
    };

    if (newStudent.name.length === 0) {
      setHeaderMessage('Warning');
      setMessage('Name is required !');
      setColorMessage('danger');
      setShowToast(true);

      setTimeout(()=>{
        setShowToast(false);
      }, 3000)
    } else if (newStudent.country.length === 0) {
      setHeaderMessage('Warning');
      setMessage('Country is required !');
      setColorMessage('danger');
      setShowToast(true);

      setTimeout(()=>{
        setShowToast(false);
      }, 3000)
    } else if (newStudent.languages.length === 0) {
      setHeaderMessage('Warning');
      setMessage('Language is required !');
      setColorMessage('danger');
      setShowToast(true);

      setTimeout(()=>{
        setShowToast(false);
      }, 3000)
    } else if (newStudent.dateOfBirth.length === 0) {
      setHeaderMessage('Warning');
      setMessage('DoB is required !');
      setColorMessage('danger');
      setShowToast(true);

      setTimeout(()=>{
        setShowToast(false);
      }, 3000)
    } else if (newStudent.gender.length === 0) {
      setHeaderMessage('Warning');
      setMessage('Gender is required !');
      setColorMessage('danger');
      setShowToast(true);

      setTimeout(()=>{
        setShowToast(false);
      }, 3000)
    } else {
      setHeaderMessage('Success');
      setMessage('Form Submitted Successfully.');
      setColorMessage('success');
      setShowToast(true);

      setTimeout(()=>{
        setShowToast(false);
      }, 3000)  

      insertStudent(newStudent);
    }
  };

  return (
    <IonPage>
      {/* Register Page */}
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register page</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Name */}
        <IonItem>
          <IonLabel position="stacked">Name</IonLabel>
          <IonInput placeholder="Please Enter Name." onIonChange={event => setName(event.detail.value!)}></IonInput>
        </IonItem>

        {/* elect Country */}
        <IonItem>
          <IonLabel position="stacked">Country</IonLabel>
          <IonSelect placeholder="Please Select Country." onIonChange={event => setCountry(event.detail.value)}>
            <IonSelectOption value="Vietnam">Vietnam</IonSelectOption>
            <IonSelectOption value="English">English</IonSelectOption>
            <IonSelectOption value="Japan">Japan</IonSelectOption>
            <IonSelectOption value="Korea">Korea</IonSelectOption>
            <IonSelectOption value="China">China</IonSelectOption>
          </IonSelect>
        </IonItem>

        {/* Select Languages */}
        <IonItem>
          <IonLabel position="stacked">Speakable Languages</IonLabel>
          <IonSelect placeholder="Please Select Speakable Languages." multiple={true} onIonChange={event =>setLanguages(event.detail.value)}>
            <IonSelectOption value="Vietnamese">Vietnamese</IonSelectOption>
            <IonSelectOption value="English">English</IonSelectOption>
            <IonSelectOption value="Japan">Japanese</IonSelectOption>
            <IonSelectOption value="Korea">Korean</IonSelectOption>
            <IonSelectOption value="China">Chinese</IonSelectOption>
          </IonSelect>
        </IonItem>

        {/* DoB */}
        <IonItem>
          <IonLabel position="stacked">Date of Birth</IonLabel>
          <IonDatetime placeholder="Please Enter DoB." display-format="YYYY/MM/DD" onIonChange={event =>setDateOfBirth(event.detail.value!)} value={dateOfBirth}></IonDatetime>
        </IonItem>

        {/* Gender */}
        <IonItem>
          <IonLabel position="stacked">Gender</IonLabel>
          <IonRadioGroup onIonChange={event =>setGender(event.detail.value)}>
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

        {/* Button Submit */}
        <IonButton color="success" expand="block" onClick={registerClick}>
         🗃 Submit
        </IonButton>

         {/* Toast */}
         <IonToast isOpen={showToast} header={headerMessage} message={message} color={colorMessage} position="top"></IonToast>
      </IonContent>
    </IonPage>
  );
};

export default Register;