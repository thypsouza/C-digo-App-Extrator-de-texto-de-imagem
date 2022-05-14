const inputImage = document.querySelector('.input-image');
const btnAdcImage = document.querySelector('.btnAdcImagens');
const saidaTexto  = document.querySelector('.output-text');
const imagePreview = document.querySelector('.preview');
const barraProgresso = document.querySelector('.barraProgresso');

function controlarProgresso(n){
    barraProgresso.style.width = `${n}%`; 
}

async function extrairTexto(img){
  const worker = Tesseract.createWorker({
    logger: function(m){
        console.log(m);
        controlarProgresso(m.progress * 100);
    }
  });
  
   await worker.load();
   await worker.loadLanguage('eng+por');
   await worker.initialize('eng+por');
   const { data: { text } } = await worker.recognize(img);
   saidaTexto.value = text;
   await worker.terminate();

}

btnAdcImage.addEventListener('click' , function(){
    inputImage.click();
})

inputImage.addEventListener('change' , function(){
    let fileImage = inputImage.files[0];

    imagePreview.src = URL.createObjectURL(fileImage);

    try{
      extrairTexto(fileImage);

    }catch(e){
        console.log('erro' , e);
    }

;})


