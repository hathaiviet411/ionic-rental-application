import { 
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonDatetime,
  IonRadioGroup,
  IonRadio,
  IonTextarea,
  IonButton,
  IonToast,
} from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { createApartment } from '../databaseHandler';

// Format the date to YYYY/mm/dd format
function ymdFormatDate(year: number, month: number, date: number) {
  if (!year && !month && !date) {
    return '';
  }

  return `${year}/${month}/${date}`;
};

// Get the year, month, day fo the user input
function convertDateToYMD(date: string) {
  if (!date) {
    return '';
  }
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = (newDate.getMonth() + 1);
  const day = newDate.getDate();

  return ymdFormatDate(year, month, day);
};

const Create: React.FC = () => {
  const [propertyType, setPropertyType] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [date, setDate] = useState('');
  const [monthlyRentPrice, setMonthlyRentPrice] = useState('');
  const [furnitureTypes, setFurnitureTypes] = useState('');
  const [notes, setNotes] = useState('');
  const [nameReporter, setNameReporter] = useState('');
  const [showToastMessage, setShowToastMessage] = useState(false);
  const [headerMessage, setHeaderMessage] = useState('');
  const [message, setMessage] = useState('');
  const [colorMessage, setColorMessage] = useState('');
  const history = useHistory();

  const handleSubmitNewApartment = async() => {
    const RentalApplicationData = {
      propertyType,
      bedrooms,
      date: convertDateToYMD(date),
      monthlyRentPrice,
      furnitureTypes,
      notes,
      nameReporter,
    };

    if (RentalApplicationData.propertyType.length === 0) {
      setHeaderMessage('Warning');
      setMessage('Property Type is required !');
      setColorMessage('danger');
      setShowToastMessage(true);

      setTimeout(() => {
        setShowToastMessage(false);
      }, 3000)
    } else if (RentalApplicationData.bedrooms.length === 0) {
      setHeaderMessage('Warning');
      setMessage('Bedrooms is required !');
      setColorMessage('danger');
      setShowToastMessage(true);

      setTimeout(() => {
        setShowToastMessage(false);
      }, 3000)
    } else if (RentalApplicationData.date.length === 0) {
      setHeaderMessage('Warning');
      setMessage('Date of the added property is required !');
      setColorMessage('danger');
      setShowToastMessage(true);

      setTimeout(() => {
        setShowToastMessage(false);
      }, 3000)
    } else if (RentalApplicationData.monthlyRentPrice.length === 0) {
      setHeaderMessage('Warning');
      setMessage('Monthly rent price is required !');
      setColorMessage('danger');
      setShowToastMessage(true);

      setTimeout(() => {
        setShowToastMessage(false);
      }, 3000)
    } else if (RentalApplicationData.furnitureTypes.length === 0) {
      setHeaderMessage('Warning');
      setMessage(`Furniture type is required !`);
      setColorMessage('danger');
      setShowToastMessage(true);

      setTimeout(() => {
        setShowToastMessage(false);
      }, 3000)
    } else {
      await createApartment(RentalApplicationData);

      setHeaderMessage('Success');
      setMessage('Created Apartment Successfully !');
      setColorMessage('success');
      setShowToastMessage(true);
      
      setTimeout(()=>{
        setShowToastMessage(false);
        history.push('/home');
      }, 2000)
    }
  };

  return (
    <IonPage>

      {/* Application Header */}
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create Screen</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* Application Content */}
      <IonContent fullscreen>
        <IonGrid>

          {/* Property Type */}
          <IonRow>
            <IonCol>
              <IonLabel position="stacked">🗃 Property type</IonLabel>
              <IonSelect
                value={ propertyType }
                onIonChange={event => setPropertyType(event.detail.value)}
                placeholder="Please Select Property Type."
              >
                <IonSelectOption value="Flat">Flat</IonSelectOption>
                <IonSelectOption value="House">House</IonSelectOption>
                <IonSelectOption value="Bungalow">Bungalow</IonSelectOption>
              </IonSelect>
            </IonCol>
          </IonRow>

          {/* Bedrooms */}
          <IonRow>
            <IonCol>
              <IonLabel position="stacked">🛌 Bedrooms</IonLabel>
              <IonInput
                value={ bedrooms }
                type="number"
                onIonChange={event => setBedrooms(event.detail.value!)}
                placeholder="Please Enter The Number of The Bedrooms."
              ></IonInput>
            </IonCol>
          </IonRow>

          {/* Date of The Added Property */}
          <IonRow>
            <IonCol>
              <IonLabel position="stacked">📅 Date</IonLabel>
              <IonDatetime
                value={ date }
                onIonChange={event => setDate(event.detail.value!)} 
                display-format="YYYY/MM/DD" 
                placeholder="Please Select The Date of The Added Property."
              ></IonDatetime>
            </IonCol>
          </IonRow>

          {/* Monthly Rent Price */}
          <IonRow>
            <IonCol>
              <IonLabel position="stacked">💰 Monthly Rent Price</IonLabel>
              <IonInput 
                value={ monthlyRentPrice }
                type="number"
                onIonChange={event => setMonthlyRentPrice(event.detail.value!)} 
                placeholder="Please Enter Monthly Rent Price."
              ></IonInput>
            </IonCol>
          </IonRow>

          {/* Furniture Types */}
          <IonRow>
            <IonCol>
              <IonLabel position="stacked">🚪 Furniture Types</IonLabel>

              <IonRadioGroup value={ furnitureTypes } onIonChange={event => setFurnitureTypes(event.detail.value)} style={{ marginTop: '10px' }}>
              <IonItem>
                <IonLabel><small>Furnished</small></IonLabel>
                <IonRadio slot="start" value="Furnished"></IonRadio>
              </IonItem>

              <IonItem>
                <IonLabel><small>Unfurnished</small></IonLabel>
                <IonRadio slot="start" value="Unfurnished"></IonRadio>
              </IonItem>

              <IonItem>
                <IonLabel><small>Part Furnished</small></IonLabel>
                <IonRadio slot="start" value="PartFurnished"></IonRadio>
              </IonItem>
            </IonRadioGroup>

            </IonCol>
          </IonRow>

          {/* Notes */}
          <IonRow>
            <IonCol>
              <IonLabel position="stacked">📝 Notes</IonLabel>
              <IonTextarea value={ notes } onIonChange={event => setNotes(event.detail.value!)} placeholder="Please Enter Notes"></IonTextarea>
            </IonCol>
          </IonRow>

          {/* Name of The Reporter */}
          <IonRow>
            <IonCol>
              <IonLabel position="stacked">🔖 Name of The Reporter</IonLabel>
              <IonInput value={ nameReporter } onIonChange={event => setNameReporter(event.detail.value!)} placeholder="Input name reporter"></IonInput>
            </IonCol>
          </IonRow>

          {/* Button Submit */}
          <IonRow>
            <IonCol>
              <IonButton color="success" expand="block" onClick={ handleSubmitNewApartment }>🗃 Submit</IonButton>
            </IonCol>
          </IonRow>

        </IonGrid>
      </IonContent>

      {/* Application Toast Message */}
      <IonToast isOpen={ showToastMessage } header={ headerMessage } message={ message } color={ colorMessage } position="top"></IonToast>

    </IonPage>
  );
};

export default Create;
