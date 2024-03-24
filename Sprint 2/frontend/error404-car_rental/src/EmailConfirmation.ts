
type EmailProps = {
    name: string;
    confirmation: string;
    startDate: string;
    endDate: string;
    pickup: string;
    dropoff: string;
    model: string;
    year: string;
    additional: string;
    total: string;

}

export class EmailConfirmation{
    static emailProps : EmailProps = {
        name: "",
        confirmation: "",
        startDate: "",
        endDate: "",
        pickup: "",
        dropoff: "",
        model: "",
        year: "",
        additional: "",
        total: ""
    }; 

}