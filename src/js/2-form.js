const STORAGE_KEY = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');

function loadFormData() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  
  if (savedData) {
    try {
      formData = JSON.parse(savedData);
      
      form.elements.email.value = formData.email || '';
      form.elements.message.value = formData.message || '';
    } catch (error) {
      console.error('Помилка парсингу даних з localStorage:', error);
    }
  }
}

function onFormInput(event) {
  const fieldName = event.target.name;
  const fieldValue = event.target.value;
  
  formData[fieldName] = fieldValue;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();
  
  const trimmedEmail = formData.email.trim();
  const trimmedMessage = formData.message.trim();
  
  if (!trimmedEmail || !trimmedMessage) {
    alert('Fill please all fields');
    return;
  }
  
  console.log({
    email: trimmedEmail,
    message: trimmedMessage,
  });
  
  localStorage.removeItem(STORAGE_KEY);
  
  formData = {
    email: '',
    message: '',
  };
  
  form.reset();
}

loadFormData();

form.addEventListener('input', onFormInput);
form.addEventListener('submit', onFormSubmit);