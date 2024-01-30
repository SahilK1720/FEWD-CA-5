import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import '../css/Form.css';

function Form() {
  const navigate = useNavigate();

  // Initialize useForm hook with destructured properties for form handling.
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

   // onSubmit function that will be called upon form submission.
  const onSubmit = (values) => {
    console.log(values);
    navigate("/");
     // Used to show the "Registration Successful" message in the Home component.
    sessionStorage.setItem("registrationSuccess", "true");
  };

  return (
    <div className="form-container">
      <h1 className='text'>Register to avail more books</h1>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <label>First Name:</label>
        <input type="text" {...register("firstName", { required: 'First name is Required!', minLength: { value: 3, message: "Name should be more than 2 characters" }, maxLength: { value: 30, message: "Name should be less than 30 characters" } })} />
        {errors.firstName && <p className='error-text'>{errors.firstName.message}</p>}
        <label>Email:</label>
        <input type="email" {...register("email", { required: 'Email is Required!', pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })} />
        {errors.email && <p className='error-text'>{errors.email.message}</p>}

        <label>Password:</label>
        <input type="password" {...register("password", { required: 'Password is Required!', pattern: { value: /.*[\W]+.*/i, message: "Password must contain at least one special character" }, minLength: { value: 10, message: "Password must have at least 10 characters" } })} />
        {errors.password && <p className='error-text'>{errors.password.message}</p>}

        <label>Confirm Password:</label>
        <input type='password' {...register('confirm', { required: 'Confirm Your Password', validate: (value) => value === watch('password') || "Passwords don't match" })} />
        {errors.confirm && <p className='error-text'>{errors.confirm.message}</p>}

        <input type="submit" value="Sign Up" className='button' disabled={Object.keys(errors).length} />
      </form>
    </div>
  );
}

export default Form;
