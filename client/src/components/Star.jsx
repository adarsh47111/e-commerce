const Star = ({
  half = false,
  empty = false,
  heightInRem = "1.2rem",
  widthInRem = "1.2rem",
}) => {
  if (half)
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={widthInRem}
        height={heightInRem}
        viewBox="0 0 24 24"
      >
        <path
          fill="#ff4000"
          d="M12 2.35c-.482 0-.964.25-1.212.752L8.43 7.88l-5.273.766c-1.107.16-1.55 1.522-.748 2.303l3.815 3.719l-.9 5.25c-.15.874.544 1.583 1.331 1.582c.208 0 .422-.05.63-.158l4.714-2.479l4.715 2.479c.99.52 2.148-.32 1.96-1.423l-.902-5.251l3.816-3.72c.8-.78.359-2.141-.748-2.302l-5.273-.766l-2.358-4.778a1.34 1.34 0 0 0-1.21-.752m0 14.993V4.042l2.257 4.572a1.35 1.35 0 0 0 1.016.739l5.05.734l-3.654 3.562a1.35 1.35 0 0 0-.388 1.195l.862 5.029l-4.516-2.375a1.35 1.35 0 0 0-.627-.155"
        ></path>
      </svg>
    );

  if (empty)
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={widthInRem}
        height={heightInRem}
        viewBox="0 0 24 24"
      >
        <path
          fill="#ff4000"
          d="M16.855 20.966c-.224 0-.443-.05-.646-.146l-.104-.051l-4.107-2.343l-4.107 2.344l-.106.053a1.524 1.524 0 0 1-1.521-.143a1.505 1.505 0 0 1-.586-1.509l.957-4.642l-1.602-1.457l-1.895-1.725l-.078-.082a1.503 1.503 0 0 1-.34-1.492c.173-.524.62-.912 1.16-1.009l.102-.018l4.701-.521l1.946-4.31l.06-.11a1.5 1.5 0 0 1 1.309-.771c.543 0 1.044.298 1.309.77l.06.112l1.948 4.312l4.701.521l.104.017c.539.1.986.486 1.158 1.012c.17.521.035 1.098-.34 1.494l-.078.078l-3.498 3.184l.957 4.632a1.514 1.514 0 0 1-.59 1.519a1.488 1.488 0 0 1-.874.281m-8.149-6.564c-.039.182-.466 2.246-.845 4.082l3.643-2.077a1 1 0 0 1 .99 0l3.643 2.075l-.849-4.104a.998.998 0 0 1 .308-.942l3.1-2.822l-4.168-.461a1 1 0 0 1-.801-.584l-1.728-3.821l-1.726 3.821c-.146.322-.45.543-.801.584l-4.168.461l3.1 2.822a.995.995 0 0 1 .302.966"
        ></path>
      </svg>
    );

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={widthInRem}
      height={heightInRem}
      viewBox="0 0 24 24"
    >
      <g fill="none">
        <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
        <path
          fill="#ff4000"
          d="M10.92 2.868a1.25 1.25 0 0 1 2.16 0l2.795 4.798l5.428 1.176a1.25 1.25 0 0 1 .667 2.054l-3.7 4.141l.56 5.525a1.25 1.25 0 0 1-1.748 1.27L12 19.592l-5.082 2.24a1.25 1.25 0 0 1-1.748-1.27l.56-5.525l-3.7-4.14a1.25 1.25 0 0 1 .667-2.055l5.428-1.176z"
        ></path>
      </g>
    </svg>
  );
};

export default Star;
