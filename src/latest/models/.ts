import Model from "@util/Model";

class  implements Model
{ 
  id: number;
  : ;
  : ;
  : ;

  constructor(id: number)
  {
    this.id = id;
  }

  build(attrs: { : , : , :  }): 
  {
    this. = attrs.;
    this. = attrs.;
    this. = attrs.;
    return this;
  }

  toJSON()
  {
    return {
      id: this.id,
      : this.,
      : this.,
      : this.
    };
  }
}

export default ;