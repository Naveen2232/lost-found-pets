import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const dogBreeds = ['Labrador','Beagle','Bulldog','German Shepherd'];
const catBreeds = ['Persian','Siamese','Maine Coon','Bengal'];
const colors = ['Black','White','Brown','Golden','Gray','Other'];
const sizes = ['Small','Medium','Large','Other'];

function readImage(file){
  return new Promise((res, rej) => {
    if(!file) return res('');
    const reader = new FileReader();
    reader.onload = e => res(e.target.result);
    reader.onerror = err => rej(err);
    reader.readAsDataURL(file);
  });
}

export default function AddLost(){
  const navigate = useNavigate();
  const [form, setForm] = useState({name:'', type:'Dog', breed:'', color:'Black', colorOther:'', size:'Medium', sizeOther:'', gender:'Male', dateLost:'', location:'', description:'', chipId:'', contact:'', image:''});
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const {name, value, files} = e.target;
    if(name==='image'){
      readImage(files[0]).then(data => setForm(f=>({...f, image:data})));
      return;
    }
    setForm(f=>({...f, [name]:value}));
  };

  const validate = ()=>{
    const err = {};
    if(!form.name) err.name = 'Name required';
    if(!form.type) err.type = 'Type required';
    if(!form.dateLost) err.dateLost = 'Date required';
    if(!form.location) err.location = 'Location required';
    if(!form.contact || !/^[0-9]{10}$/.test(form.contact)) err.contact = '10 digit contact required';
    setErrors(err);
    return Object.keys(err).length===0;
  };

  const onSubmit = e => {
    e.preventDefault();
    if(!validate()) return alert('Please fix errors before submitting');
    const stored = JSON.parse(localStorage.getItem('lostPets')||'[]');
    const newItem = {...form, id: Date.now()};
    stored.push(newItem);
    localStorage.setItem('lostPets', JSON.stringify(stored));
    navigate('/');
  };

  const breedOptions = form.type === 'Dog' ? dogBreeds : catBreeds;

  return (
    <div className="container">
      <h2>Report Lost Pet</h2>
      <form className="form" onSubmit={onSubmit}>
        <div className="row">
          <div style={{flex:1}}>
            <label>Pet Name *</label>
            <input className="input" name="name" value={form.name} onChange={handleChange} />
            {errors.name && <div style={{color:'red'}}>{errors.name}</div>}
          </div>
          <div style={{width:160}}>
            <label>Pet Type *</label>
            <select name="type" value={form.type} onChange={handleChange} className="input">
              <option>Dog</option>
              <option>Cat</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div className="row" style={{marginTop:10}}>
          <div style={{flex:1}}>
            <label>Breed {form.type!=='Other' ? '*' : '(optional)'}</label>
            {form.type !== 'Other' ? (
              <select name="breed" value={form.breed} onChange={handleChange} className="input">
                <option value="">Select Breed</option>
                {breedOptions.map(b=> <option key={b}>{b}</option>)}
              </select>
            ) : (
              <input name="breed" className="input" value={form.breed} onChange={handleChange} placeholder="Enter breed" />
            )}
          </div>
          <div style={{width:160}}>
            <label>Color *</label>
            <select name="color" value={form.color} onChange={handleChange} className="input">
              {['Black','White','Brown','Golden','Gray','Other'].map(c=> <option key={c}>{c}</option>)}
            </select>
            {form.color === 'Other' && <input name="colorOther" className="input" value={form.colorOther} onChange={handleChange} placeholder="Enter color" style={{marginTop:8}} />}
          </div>
        </div>

        <div className="row" style={{marginTop:10}}>
          <div style={{width:220}}>
            <label>Size *</label>
            <select name="size" value={form.size} onChange={handleChange} className="input">
              {sizes.map(s=> <option key={s}>{s}</option>)}
            </select>
            {form.size==='Other' && <input name="sizeOther" className="input" value={form.sizeOther} onChange={handleChange} placeholder="Describe size" style={{marginTop:8}} />}
          </div>
          <div style={{width:160}}>
            <label>Gender</label>
            <select name="gender" value={form.gender} onChange={handleChange} className="input">
              <option>Male</option><option>Female</option>
            </select>
          </div>
          <div style={{flex:1}}>
            <label>Date Lost *</label>
            <input type="date" name="dateLost" className="input" value={form.dateLost} onChange={handleChange} />
            {errors.dateLost && <div style={{color:'red'}}>{errors.dateLost}</div>}
          </div>
        </div>

        <div style={{marginTop:10}}>
          <label>Lost Location *</label>
          <input name="location" className="input" value={form.location} onChange={handleChange} />
          {errors.location && <div style={{color:'red'}}>{errors.location}</div>}
        </div>

        <div style={{marginTop:10}}>
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange}></textarea>
        </div>

        <div className="row" style={{marginTop:10}}>
          <div style={{flex:1}}>
            <label>Tag / Microchip ID (optional)</label>
            <input name="chipId" className="input" value={form.chipId} onChange={handleChange} />
          </div>
          <div style={{width:200}}>
            <label>Contact Number *</label>
            <input name="contact" className="input" value={form.contact} onChange={handleChange} placeholder="10 digits" />
            {errors.contact && <div style={{color:'red'}}>{errors.contact}</div>}
          </div>
          <div style={{width:200}}>
            <label>Upload Image</label>
            <input type="file" name="image" accept="image/*" onChange={handleChange} />
          </div>
        </div>

        <div style={{marginTop:12, textAlign:'right'}}>
          <button type="submit" className="btn" style={{background:'#111827', color:'white'}}>Submit Report</button>
        </div>
      </form>
    </div>
  );
}
