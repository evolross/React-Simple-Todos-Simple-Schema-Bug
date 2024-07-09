import { Meteor } from 'meteor/meteor';
import React from 'react';

export const AddLink = () => {
  const addNewLink = (isDirect) => {

    console.log(`Called addNewLink (${isDirect})...`);

    Meteor.call("links.insert", {
      linkType: "website",
      title: "Read some news!",
      url: "https://www.huffpost.com/"
    },
    isDirect,
    function(error, result) {
        if (error) {
            console.log("error", error);
        }
        if (result) {
            console.log("result", result);
        }
    });
  };
  

  return (
    <div>
      <button onClick={() => addNewLink(false)}>Add New Link</button>
      <button onClick={() => addNewLink(true)}>Add New Link(Direct)</button>
    </div>
  );
};
