//un aliment
export default class Aliment {
    constructor(id, nom, qte, photo) {
      this._id = id;
      this._nom = nom;
      this._qte = qte;
      this._photo = photo;
    }
    get id(){
      return this._id;
    }
    get nom(){
      return this._nom;
    }
    get qte(){
      return this._qte;
    }
    get photo(){
      return this._photo;
    }

    set qte(qte){
      this._qte=qte;
    }
  
    toShow(){
      return `${this._photo} ${this._nom} : ${this._qte}`;
    }

    diminuerQte(){
      this._qte--;
    }
    ajouterQte(){
      this._qte++;
    }

    showNom(){
      return `Aliment : ${this._nom}`;
    }
    showQte(){
      return `Quantité : ${this._qte}`;
    }
  
    static fromJson(json) {
      const { id, nom, qte, photo } = json;
      return new Aliment(id, nom, qte, photo);
    }
  
    toJson() {
      return {
        id: this._id,
        nom: this._nom,
        qte: this._qte,
        photo: this._photo
      };
    }
  }