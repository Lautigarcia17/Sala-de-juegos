export class Card {
    private _name: string
    private _value: string
    private _img: string

    constructor(name: string = '', value: string = '', image: string = '') {
        this._name = name;
        this._value = value;
        this._img = image;
    }

    /*Setters*/
    set name(name: string) {
        this._name = name;
    }
    set value(value: string) {
        this._value = value;
    }
    set img(img: string) {
        this._img = img;
    }

    /*Getters*/
    get name(): string {
        return this._name;
    }
    get value(): string {
        return this._value;
    }
    get img(): string {
        return this._img;
    }


    clone(): Card {
        return new Card(this._name, this._value, this._img);
    }


    clearCard() : void{
        this._name = "";
        this._img = "";
        this._value = "";
    }

    getNumberOfCard() : number{
        let number = -1;
        switch(this._value)
        {
          case "JACK":
            number = 11;
            break;
          case "QUEEN":
            number = 12;
            break;
          case "KING":  
            number = 13;
          break;
          case "ACE":
            number = 14;
          break;
          default:
            number = parseInt(this._value)
          break;
        }
        return number;
    }

}
