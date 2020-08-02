class DateHelper {
    constructor() {
        throw new Error('Essa clase não pode ser instânciada');
    }
  
    static dataParaTexto(data) {
        const date = new Date(data);
        return `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`;
    }
  }
  
  export default DateHelper;
  