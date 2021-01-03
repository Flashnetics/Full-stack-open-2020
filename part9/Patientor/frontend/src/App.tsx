import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList, setDiagnosisList } from "./state";
import { Patient, Diagnosis } from "./types";
import PatientInfo from './components/PatientInfo';
import PatientListPage from "./PatientListPage";

const App: React.FC = () => {
    const [, dispatch] = useStateValue();
    React.useEffect(() => {
        axios.get<void>(`${apiBaseUrl}/ping`);
        const fetchPatients = async () => {
            try {
                const { data: patientListFromApi } = await axios.get<Patient[]>(
                `${apiBaseUrl}/patients`
                );
                dispatch(setPatientList(patientListFromApi));
            } catch (e) {
                console.error(e);
            }
        };
        const fetchDiagnosisList = async () => {
            try {
                const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
                    `${apiBaseUrl}/diagnosis`
                );
                dispatch(setDiagnosisList(diagnosisListFromApi));
            } catch (e) {
                console.log(e);
            }
        };        
        fetchPatients();
        fetchDiagnosisList();
    }, [dispatch]);

    return (
        <div className="App">
            <Router>
                <Container>
                    <Header as="h1">Patientor</Header>
                    <Button as={Link} to="/" primary>
                        Home
                    </Button>
                    <Divider hidden />
                    <Switch>
                        <Route path="/patients/:id">
                            <PatientInfo />
                        </Route>
                        <Route path="/" render={() => <PatientListPage />} />
                    </Switch>
                </Container>
            </Router>
        </div>
  );
};

export default App;
