let icon =
  '<svg width="29" height="18" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" overflow="hidden"><defs><clipPath id="clip0"><rect x="118" y="82" width="29" height="18"/></clipPath></defs><g clip-path="url(#clip0)" transform="translate(-118 -82)"><path d="M127 83.8334C127 83.3731 127.373 83 127.833 83L131.167 83C131.627 83 132 83.3731 132 83.8334L132 97.1666C132 97.6269 131.627 98 131.167 98L127.833 98C127.373 98 127 97.6269 127 97.1666Z" stroke="#000000" stroke-width="2" stroke-miterlimit="8" fill="none" fill-rule="evenodd"/><path d="M118.5 90.8334 123.152 90.8334 123.151 92.1668 118.5 92.1667ZM121.818 88.8334 127.151 91.5002 121.818 94.1668Z"/><path d="M132.5 90.8334 137.152 90.8334 137.151 92.1668 132.5 92.1667ZM135.818 88.8334 141.151 91.5002 135.818 94.1668Z"/></g></svg>'

miro.onReady(() => {
  miro.initialize({
    extensionPoints: {
      toolbar: {
        title: '物と情報の流れ図',
        librarySvgIcon: icon,
        toolbarSvgIcon: icon,
        onClick: () => {
          miro.board.ui.openLeftSidebar('content.html', {title: '物と情報の流れ図'})
        }, 
      },
    },
  })
})

