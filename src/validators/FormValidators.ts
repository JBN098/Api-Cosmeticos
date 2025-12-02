import{FormControl, ValidationErrors} from '@angular/forms';


export class FormValidators {
//Aqui hacemos nuestras validaciones personalizadas.
  static notOnlyWhiteSpace(control: FormControl): ValidationErrors | null{
    if ((control.value != null) &&(control.value.trim().length == 0)){
        return{notOnlyWhiteSpace: true};
      }else {
        return null;
      }

  }

  static forbiddenWord(word: string[]): ValidationErrors | null {
    return (control: FormControl): ValidationErrors | null =>{
    let result=null;
    word.forEach(p => {
      const regExp =new RegExp(p, "i")
      const forbidden = regExp.test(control.value);
     if (forbidden) result = {forbiddenWord: {value: control.value}};
    })
      return result;
    }
  }

  static minValue(value: number): ValidationErrors|null {
    return (control: FormControl): ValidationErrors|null =>{
      if(control.value < value) return {minValue: true}
      else return null;}


  }

  static allowedExtension (regex: RegExp): ValidationErrors | null {
    return(control: FormControl): ValidationErrors | null => {
      const allowed = regex.test(control.value);
      return allowed ? {allowedExtension: true} : null;

    }
  }

}

