import React from "react";
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Stack,
  FormErrorMessage,
} from "@chakra-ui/react";
import CryptoJS from "crypto-js";
import { useSelector } from "react-redux";
import { POST } from "../../utilities/ApiProvider";

const PaymentForm = () => {
  const user = useSelector(state => state.user.value);

  const [errors, setErrors] = React.useState({});
  
  const sharedSecret = "a{F9Yt$2Bp"; // Secret key for hash generation

  // Function to handle form submission
  const handleFormSubmit = async(e) => {
    e.preventDefault(); // Prevent the default form submission


    


    // Validate required fields before proceeding
    const formData = new FormData(e.target);
    const formValues = {};

    formData.forEach((value, key) => {
      formValues[key] = value;
    });
        // Submit data to the api to get Order Id.
    const response = await POST('/order', {
      totalAmount  : Number(formData.get('chargetotal')),
      orderType : 1,
      status : 1,
      orderNo : "1212"
    });
    if(response?.status == 200)
    {
      setVal("responseSuccessURL",`https://simplesearch.testlink.store/api/order/successCallBack?id=${Number(response?.data?.id)}`);
    }
    

    // Add validation for required fields
    const requiredFields = ["chargetotal", "bname"];
    let validationErrors = {};

    requiredFields.forEach((field) => {
      if (!formValues[field]) {
        validationErrors[field] = `${field} is required.`;
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      console.log("Validation Errors:", validationErrors);
      return; // Prevent form submission if validation fails
    }

    // Set values like storename, currency, txndatetime, hashExtended
    setVal("storename", 7220541848); // Store ID
    setVal("currency", 826); // Currency code for GBP
    setVal("txndatetime", getDateTime()); // Set current datetime
    setVal("hashExtended", getExtendedHash()); // Calculate and set hash

    // Submit form manually after values are set

    const formElements = document.querySelectorAll('form input, form select, form textarea');
  formElements.forEach((element) => {
    console.log(`${element.name}: ${element.value}`);
  });

    debugger;

    e.target.submit();
  };

  const getDateTime = () => {
    const dateObj = new Date();
    const pad = (num) => (num <= 9 ? "0" + num : num);
    const date = `${dateObj.getFullYear()}:${pad(dateObj.getMonth() + 1)}:${pad(dateObj.getDate())}`;
    const time = `${pad(dateObj.getHours())}:${pad(dateObj.getMinutes())}:${pad(dateObj.getSeconds())}`;
    return `${date}-${time}`;
  };

  const getExtendedHash = () => {
    setVal("hash_algorithm", "HMACSHA256");
  
    const separator = "|";
    const formElements = document.querySelectorAll('form input, form select, form textarea'); // Use form fields directly
    let concatenatedString = "";
    let testSequence = [];



  
    // Create an array of name-value pairs
    let formData = [];
    Array.from(formElements).forEach((element) => {
      if (element.name && element.value) { // Only include elements with a name and value
        formData.push({
          name: element.name,
          value: element.value,
        });
      }
    });
  
    // Sort the array alphabetically by parameter names
    formData.sort((a, b) => a.name.localeCompare(b.name));
  
    // Concatenate the sorted parameters
    formData.forEach((item) => {
      testSequence.push({
        key: item.name,
        value: item.value
      });
      concatenatedString += item.value + separator; // Add separator after each value
    });
  
    console.log("checking Sequence");
    console.log(testSequence);
    console.log("Concatenated String Before Removing Separator:");
    console.log(concatenatedString);
  
    // Remove the last separator (to prevent an extra separator at the end)
    concatenatedString = concatenatedString.slice(0, -1);
  
    // Set the concatenated string for debugging
    setVal("concat2", concatenatedString);
  
    // Generate the hash using the shared secret
    console.log('before string');
    console.log(concatenatedString);
  
    const hash = CryptoJS.HmacSHA256(concatenatedString, sharedSecret);
    console.log("AFTER STRING");
    console.log(CryptoJS.enc.Base64.stringify(hash));
    return CryptoJS.enc.Base64.stringify(hash);
  };
  

  // Set form value function (for hidden fields)
  const setVal = (name, value) => {
    const elem = document.getElementsByName(name)[0];
    if (elem) elem.value = value;
  };

  return (
    <Flex align="center" justify="center" minHeight="100vh" bg="gray.50" p={4}>
      <Box
        bg="white"
        boxShadow="xl"
        borderRadius="lg"
        p={8}
        maxWidth="500px"
        width="100%"
      >
        <Heading size="lg" mb={6} textAlign="center" color="teal.600">
          IPG Hosted Payment Page
        </Heading>

        <form
          action="https://test.ipg-online.com/connect/gateway/processing"
          method="POST"
          onSubmit={handleFormSubmit}
        >
          <Stack spacing={4}>
            <input name="hashExtended" type="hidden" />
            <input name='orderApiId' type='hidden' />
            <input name="checkoutoption" type="hidden" value="combinedpage" />
            <input name="currency" type="hidden" />
            <input name="hash_algorithm" type="hidden" />
            <input name="responseFailURL" type="hidden" value="https://simplesearch.testlink.store/api/order/successCallBack" />
            <input name="responseSuccessURL" type="hidden"/>
            <input name="storename" type="hidden" />
            <input name="timezone" type="hidden" value="Europe/London" />
            <input
              name="transactionNotificationURL"
              type="hidden"
              value="www.test.com"
            />
            <input name="txndatetime" type="hidden" />

            {/* Amount Field */}
            <FormControl isRequired isInvalid={errors["chargetotal"]}>
              <FormLabel fontWeight="bold">Amount</FormLabel>
              <Input
                name="chargetotal"
                placeholder="Enter amount"
                focusBorderColor="teal.400"
              />
              {errors["chargetotal"] && (
                <FormErrorMessage>{errors["chargetotal"]}</FormErrorMessage>
              )}
            </FormControl>

            {/* Customer Name Field */}
            <FormControl isRequired isInvalid={errors["bname"]}>
              <FormLabel fontWeight="bold">Customer Name</FormLabel>
              <Input
                name="bname"
                value = {user.firstName + ' ' + user.lastName}
                placeholder="Enter customer name"
                focusBorderColor="teal.400"
              />
              {errors["bname"] && <FormErrorMessage>{errors["bname"]}</FormErrorMessage>}
            </FormControl>

            {/* Order ID Field */}
            {/* <FormControl isRequired isInvalid={errors["oid"]}>
            <FormLabel fontWeight="bold">Order ID</FormLabel>
              <Input
                name="oid"
                placeholder="Enter order ID"
                focusBorderColor="teal.400"
              />
              {errors["oid"] && <FormErrorMessage>{errors["oid"]}</FormErrorMessage>}
            </FormControl> */}

            {/* Transaction Type */}
            <FormControl>
              <FormLabel fontWeight="bold">Transaction Type</FormLabel>
              <Select name="txntype" defaultValue="sale" focusBorderColor="teal.400">
                <option value="sale" selected>Sale</option>
              </Select>
            </FormControl>

            <Button type="submit" colorScheme="teal" size="lg" width="100%">
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default PaymentForm;
