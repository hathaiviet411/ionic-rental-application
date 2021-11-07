import { 
  IonPage, 
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent, 
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonToast,
} from '@ionic/react';
import '../style/Home.css';
import { addCircle } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { getAllApartment, deleteApartment } from '../databaseHandler';
import { Apartment } from '../apartment';

const Home: React.FC = () => {
  const [listApartment, setListApartment] = useState<Apartment[]>([]);
  const [showToast, setShowToast] = useState(false);

  async function fetchData() {
    const allApartment = await getAllApartment();

    setListApartment(allApartment);
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function handleDelete(id: number) {
    const userConfirm = window.confirm("Are you sure to delete this apartment?");

    if (userConfirm) {
      await deleteApartment(id);
      setShowToast(true);
      setTimeout(()=>{
        setShowToast(false);
      }, 5000);
      await fetchData();
    };
  }

  return (
    <IonPage>

      {/* Header */}
      <IonHeader>
        <IonToolbar>
          <IonTitle>🏩 RentalZ Application</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* Content */}
      <IonContent fullscreen>
        <IonGrid>

          <IonRow>
            <IonCol>
              <IonButton size="default" color="dark" href="/create" expand="block">
                <IonIcon slot="start" icon={addCircle}></IonIcon>
                New Apartment
              </IonButton>
            </IonCol>
          </IonRow>

          {listApartment &&
            listApartment.map((apartment, index) => 
              <IonCard key={index}>
                <IonCardHeader>Apartment ID: #{ apartment.id }</IonCardHeader>
                <IonCardContent>
                  <h6>Property Type: { apartment.propertyType }</h6>
                  <h6>Bedrooms: { apartment.bedrooms }</h6>
                  <h6>Date of The Added Property: { apartment.dateOfAddedProperty }</h6>
                  <h6>Monthly Rent Price: { apartment.monthlyRentPrice}</h6>
                  <h6>Furniture Types: { apartment.furnitureTypes }</h6>
                  <h6>Notes: { apartment.notes }</h6>
                  <h6>Name of The Reporter: { apartment.nameReporter }</h6>

                  <IonRow>
                    <IonCol>
                      {/* Button Update Apartment */}
                      <IonButton 
                        size="default" 
                        color="secondary" 
                        className="btn-handle" 
                        style={{ float: 'left' }}
                        routerLink={`detail/${apartment.id}`}
                      >🖋 Update</IonButton>
                    </IonCol>

                    <IonCol>
                      {/* Button Delete Apartment */}
                      <IonButton 
                        size="default" 
                        color="danger" 
                        className="btn-handle" 
                        style={{ float: 'right' }}
                        onClick={() => handleDelete(apartment.id || -1)}
                      >🧼️ Delete</IonButton>
                    </IonCol>
                  </IonRow>
                </IonCardContent>
              </IonCard>
            )
          }

        </IonGrid>
      </IonContent>

      <IonToast isOpen={showToast} header="Success" message="🌟 Apartment Have Been Delete Successfully !" color="success" position="top"></IonToast>

    </IonPage>
  );
};

export default Home;