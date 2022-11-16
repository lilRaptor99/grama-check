import identity_check.models;

table<models:Citizen> citizenData = table [
    {id: "992383845V", first_name: "Pratheek", middle_names: "", last_name: "Senevirathne", dob: "1999-08-26", gender: "M", address: "200/4, 1st Lane, Rajagiriya"},
    {id: "990012912V", first_name: "Jolene", middle_names: "", last_name: "Robelin", dob: "1999-07-20", gender: "F", address: "587 Prairieview Plaza"},
    {id: "995619139V", first_name: "Angy", middle_names: "", last_name: "Boulter", dob: "1999-07-06", gender: "F", address: "4 Ramsey Circle"},
    {id: "992939283V", first_name: "Elton", middle_names: "", last_name: "Barenskie", dob: "1999-12-30", gender: "M", address: "38712 Northfield Park"},
    {id: "994789346V", first_name: "Anette", middle_names: "", last_name: "Comiskey", dob: "1999-01-02", gender: "F", address: "8 Cordelia Lane"},
    {id: "991777277V", first_name: "Drew", middle_names: "", last_name: "Fowle", dob: "1999-04-07", gender: "M", address: "3 Algoma Way"}
];

public function getAllCitizenData() returns models:Citizen[] {
    return citizenData.toArray();
}

public function getCitizenData(string id) returns models:Citizen? {

    models:Citizen[] matchedCitizens = from models:Citizen citizen in citizenData
        where citizen.id == id
        select citizen;

    return matchedCitizens.length() > 0 ? matchedCitizens[0] : null;
}
