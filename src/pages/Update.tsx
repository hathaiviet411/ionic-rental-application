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
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { getApartmentById, updateApartment } from '../databaseHandler';
import { Apartment } from '../apartment';

interface MyParams {
  id: string,
}

const Update: React.FC = () => {
  const { id } = useParams<MyParams>();
  const [propertyType, setPropertyType] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [dateOfAddedProperty, setDateOfAddedProperty] = useState('');
  const [monthlyRentPrice, setMonthlyRentPrice] = useState('');
  const [furnitureTypes, setFurnitureTypes] = useState('');
  const [notes, setNotes] = useState('');
  const [nameReporter, setNameReporter] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [headerMessage, setHeaderMessage] = useState('');
  const [message, setMessage] = useState('');
  const [colorMessage, setColorMessage] = useState('');
  const history = useHistory();

  async function fetchData() {
    const apartment = await getApartmentById(Number.parseInt(id)) as Apartment;
    setPropertyType(apartment.propertyType);
    setBedrooms(apartment.bedrooms);
    setDateOfAddedProperty(apartment.dateOfAddedProperty);
    setMonthlyRentPrice(apartment.monthlyRentPrice);
    setFurnitureTypes(apartment.furnitureTypes);
    setNotes(apartment.notes);
    setNameReporter(apartment.nameReporter);
  };

  useEffect(() => {
    fetchData();
  }, []);

  /**
   * Function handle Submit Form
   */
   const handleSubmit = async() => {
    const Form = {
      propertyType,
      bedrooms,
      dateOfAddedProperty,
      monthlyRentPrice,
      furnitureTypes,
      notes,
      nameReporter,
    };

    if (Form.propertyType.length === 0) {
      setHeaderMessage('Warning');
      setMessage('Property Type is required !');
      setColorMessage('danger');
      setShowToast(true);

      setTimeout(()=>{
        setShowToast(false);
      }, 3000)
    } else if (Form.bedrooms.length === 0) {
      setHeaderMessage('Warning');
      setMessage('Bedrooms is required !');
      setColorMessage('danger');
      setShowToast(true);

      setTimeout(()=>{
        setShowToast(false);
      }, 3000)
    } else if (Form.dateOfAddedProperty.length === 0) {
      setHeaderMessage('Warning');
      setMessage('Date of the added property is required !');
      setColorMessage('danger');
      setShowToast(true);

      setTimeout(()=>{
        setShowToast(false);
      }, 3000)
    } else if (Form.monthlyRentPrice.length === 0) {
      setHeaderMessage('Warning');
      setMessage('Monthly rent price is required !');
      setColorMessage('danger');
      setShowToast(true);

      setTimeout(()=>{
        setShowToast(false);
      }, 3000)
    } else if (Form.nameReporter.length === 0) {
      setHeaderMessage('Warning');
      setMessage(`Reporter's name is required !`);
      setColorMessage('danger');
      setShowToast(true);

      setTimeout(()=>{
        setShowToast(false);
      }, 3000)
    } else {
      await updateApartment(Form, parseInt(id));

      setHeaderMessage('Success');
      setMessage('🌟 Apartment Have Been Updated Successfully !');
      setColorMessage('success');
      setShowToast(true);

      history.goBack();

      setTimeout(()=>{
        setShowToast(false);
      }, 3000)  
    } 
  };

  return (
    <IonPage>

      {/* Header */}
      <IonHeader>
        <IonToolbar>
          <IonTitle>💒 Update Apartment</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* Content */}
      <IonContent fullscreen>
        <IonGrid>

          {/* Property Type */}
          <IonRow>
            <IonCol>
              <IonLabel position="stacked">🗃 Property Type</IonLabel>
              <IonSelect
                value={propertyType}
                onIonChange={event => setPropertyType(event.detail.value)}
                placeholder="Please Select Property Type."
              >
                <IonSelectOption value="Flat">Flat</IonSelectOption>
                <IonSelectOption value="House">House</IonSelectOption>
                <IonSelectOption value="Bungalow">Bungalow</IonSelectOption>
              </IonSelect>
            </IonCol>
          </IonRow>

          {/* Number of The Bedrooms */}
          <IonRow>
            <IonCol>
              <IonLabel position="stacked">🛌 Bedrooms</IonLabel>
              <IonInput
                value={bedrooms}
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
                value={dateOfAddedProperty}
                onIonChange={event => setDateOfAddedProperty(event.detail.value!)} 
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
                value={monthlyRentPrice}
                onIonChange={event => setMonthlyRentPrice(event.detail.value!)} 
                placeholder="Please Enter Monthly Rent Price."
              ></IonInput>
            </IonCol>
          </IonRow>

          {/* Furniture Types */}
          <IonRow>
            <IonCol>
              <IonLabel position="stacked">🚪 Furniture Types</IonLabel>
              <IonRadioGroup value={furnitureTypes} onIonChange={event => setFurnitureTypes(event.detail.value)} style={{ marginTop: '10px' }}>
              <IonItem>
                <IonLabel><small>Furnished</small></IonLabel>
                <IonRadio 
                  slot="start" 
                  value="Furnished"
                ></IonRadio>
              </IonItem>
              <IonItem>
                <IonLabel><small>Unfurnished</small></IonLabel>
                <IonRadio 
                  slot="start" 
                  value="Unfurnished"
                ></IonRadio>
              </IonItem>
              <IonItem>
                <IonLabel><small>Part Furnished</small></IonLabel>
                <IonRadio 
                  slot="start" 
                  value="PartFurnished"
                ></IonRadio>
              </IonItem>
            </IonRadioGroup>
            </IonCol>
          </IonRow>

          {/* Notes */}
          <IonRow>
            <IonCol>
              <IonLabel position="stacked">📝 Notes</IonLabel>
              <IonTextarea
                value={notes}
                onIonChange={event => setNotes(event.detail.value!)}
                placeholder="Please Enter Notes."
              ></IonTextarea>
            </IonCol>
          </IonRow>

          {/* Name of The Reporter */}
          <IonRow>
            <IonCol>
              <IonLabel position="stacked">🔖 Name of The Reporter</IonLabel>
              <IonInput
                value={nameReporter}
                onIonChange={event => setNameReporter(event.detail.value!)} 
                placeholder="Please Enter Name of The Reporter."
              ></IonInput>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              {/* Button Submit */}
              <IonButton color="success" expand="block" onClick={handleSubmit}>
                🗃 Submit
              </IonButton>
            </IonCol>
          </IonRow>

        </IonGrid>
      </IonContent>

      {/* Toast */}
      <IonToast isOpen={showToast} header={headerMessage} message={message} color={colorMessage} position="top"></IonToast>

    </IonPage>
  );
};

export default Update;
