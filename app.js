
      //getting required fields
      const URL = "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448";
      const message = document.querySelector('.message');
      const form = document.querySelector("form");
      const main_img = document.querySelector(".main-img");
      const imageContainer = document.querySelector(".icons"); 
      const product_vendor = document.querySelector(".product-vendor");
      const product_title = document.querySelector(".product-title");
      const price = document.querySelector(".price");
      const precentage_off = document.querySelector(".percentage-off");
      const compare_at_price = document.querySelector(".compare-at-price");
      const size_selector = document.querySelector(".size-selector");
      const color_selector = document.querySelector(".color-selector");
      const description = document.querySelector('.description');


      
      // making a request to get data from the backend
      const getData = async () => {
        try {
          const response = await fetch(`${URL}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const data = await response.json();
          console.log(data);

          //assinging data to our images
          main_img.src = data.product.images[0].src;
          const imageElements = data.product.images.map((image, index) => {
            const imgElement = document.createElement("img");
            imgElement.id = `img${index + 1}`;
            imgElement.src = image.src;
            imgElement.width = 100;
            imgElement.height = 100;
            imgElement.alt = "";
            imgElement.onclick = () => changeMainImage(imgElement);

            imageContainer.appendChild(imgElement);

            return imgElement;
          });

          //adding data to our page 
          product_vendor.textContent = data.product.vendor;
          product_title.textContent=data.product.title;
          price.textContent = data.product.price+".00";
          compare_at_price.textContent = data.product.compare_at_price;
          description.innerHTML=data.product.description;



          console.log("sizes : "+ data.product.options[1].values);
          //adding available sizes 
          var size_content="";
          const size = data.product.options[1].values.map((size) => {
            size_content += `<div class=\"size\">
              <input type=\"radio\" name=\"size\" value=\"${size}\" /> ${size}
            </div>`;
          })
          size_selector.innerHTML = size_content;

          //adding available colors 
          color_content = "";
          const color = data.product.options[0].values.map((color) => {
            const colorName = Object.keys(color)[0]; // Extracting the color name
            const colorHex = color[colorName]; // Extracting the hex code

            color_content += `<div class="color" style="background:${colorHex}" onclick="setColor(this)">
            </div>`;
          })
          color_selector.innerHTML = color_content;

        } catch (err) {
          console.log(err);
        }
      };

      getData();

      //on cliking thumbnail images
      const changeMainImage = (element) => {
        const src = element.src;
        document.querySelector(".main-img").src = src;
      };

      

      //counter button
      let count = 0;

      function decreaseCount() {
        if (count > 0) {
          count--;
          document.getElementById("count").textContent = count;
          if (count == 0) {
            document.getElementById("decrease-count").disabled = true;
          }
        }
      }
      function increaseCount() {
        document.getElementById("decrease-count").disabled = false;
        count++;
        document.getElementById("count").textContent = count;
      }




      //disable form submittion and add-to-cart message
      
      form.onsubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
      };
      function submitForm()
      {
        if(count>0)
        {
          message.textContent = "Added To Cart";
        }
        else 
        {
          message.textContent = "Please Add Atleast One Product";
        }
        message.style.display = "block";

        setTimeout(()=>
        {
          message.style.display="none";
          message.textContent = "";

        },5000)
      }



      //adding color choice 
      function setColor(clickedColor) {
        // Remove "active" class from all elements with class "color"
        const colorDivs = document.querySelectorAll('.color');
        colorDivs.forEach(div => div.classList.remove('active'));
      
        clickedColor.classList.add('active');

      }