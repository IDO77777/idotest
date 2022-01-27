let icon =
  '<circle cx="12" cy="12" r="9" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="2"></circle>'

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

