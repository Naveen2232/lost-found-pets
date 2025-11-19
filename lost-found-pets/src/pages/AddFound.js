import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const dogBreeds = ['Labrador','Beagle','Bulldog','German Shepherd'];
const catBreeds = ['Persian','Siamese','Maine Coon','Bengal'];

function readImage(file){
  return new Promise((res, rej) => {
    if(!file) return res('');
    const reader = new FileReader();
    reader.onload = e => res(e.target.result);
    reader.onerror = err => rej(err);
    reader.readAsDataURL(file);
  });
}

export default function AddFound(){
  const navigate = useNavigate();
  const [form, setForm] = useState({type:'Dog', breed:'', color:'Black', location:'', dateFound:'', description:'', image:''});
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
    if(!form.type) err.type='Required';
    if(!form.location) err.location='Required';
    if(!form.dateFound) err.dateFound='Required';
    setErrors(err);
    return Object.keys(err).length===0;
  };

  const onSubmit = e => {
    e.preventDefault();
    if(!validate()) return alert('Please fill required fields');
    const stored = JSON.parse(localStorage.getItem('foundPets')||'[]');
    const newItem = {...form, id: Date.now()};
    stored.push(newItem);
    localStorage.setItem('foundPets', JSON.stringify(stored));
    navigate('/');
  };

  const breedOptions = form.type === 'Dog' ? dogBreeds : catBreeds;

  return (
    <div className="container">
      <h2>Report Found Pet</h2>
      <form className="form" onSubmit={onSubmit}>
        <div className="row">
          <div style={{flex:1}}>
            <label>Pet Type *</label>
            <select name="type" value={form.type} onChange={handleChange} className="input">
              <option>Dog</option>
              <option>Cat</option>
              <option>Other</option>
            </select>
          </div>
          <div style={{flex:1}}>
            <label>Breed</label>
            {form.type !== 'Other' ? (
              <select name="breed" value={form.breed} onChange={handleChange} className="input">
                <option value="">Select Breed</option>
                {breedOptions.map(b=> <option key={b}>{b}</option>)}
              </select>
            ) : (
              <input name="breed" className="input" value={form.breed} onChange={handleChange} placeholder="Enter breed" />
            )}
          </div>
        </div>

        <div style={{marginTop:10}}>
          <label>Color</label>
          <select name="color" value={form.color} onChange={handleChange} className="input">
            <option>Black</option><option>White</option><option>Brown</option><option>Golden</option><option>Gray</option><option>Other</option>
          </select>
        </div>

        <div style={{marginTop:10}}>
          <label>Found Location *</label>
          <input name="location" className="input" value={form.location} onChange={handleChange} />
          {errors.location && <div style={{color:'red'}}>{errors.location}</div>}
        </div>

        <div style={{marginTop:10}}>
          <label>Date Found *</label>
          <input type="date" name="dateFound" className="input" value={form.dateFound} onChange={handleChange} />
          {errors.dateFound && <div style={{color:'red'}}>{errors.dateFound}</div>}
        </div>

        <div style={{marginTop:10}}>
          <label>Description</label>
          <textarea name="description" className="input" value={form.description} onChange={handleChange}></textarea>
        </div>

        <div style={{marginTop:10}}>
          <label>Upload Image</label>
          <input type="file" name="image" accept="image/*" onChange={handleChange} />
        </div>

        <div style={{marginTop:12, textAlign:'right'}}>
          <button type="submit" className="btn" style={{background:'#111827', color:'white'}}>Submit</button>
        </div>
      </form>
    </div>
  );
}
