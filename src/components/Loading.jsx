import React from "react";

const Loading = ({ loading, error, children }) => {
  const cloneElement = children?.type?.render?.displayName;
  const renderHandler = () => {
    //const clonedElement = cloneElement(element, props, ...children)
    //element here is the button so it's the children of loading component
    //last ..children =>  the text inside button is children for it
    if (cloneElement === "Button") {
      const cloneButton = React.cloneElement(
        children,
        { disabled: true },
        "Loading ..."
      );

      
      return (
        <>
          {loading ? (
            cloneButton
          ) : error ? (
            <>
              {children}
              <p>{error}</p>
            </>
          ) : (
            children
          )}
        </>
      );
    }
    return (
      <>
        {loading ? (
          <p>loading please wait ...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          children
        )}
      </>
    );
  };

  return renderHandler();
};

export default Loading;
