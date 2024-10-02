// Mapping for main-axis alignment (justifyContent)
const mainAxisAlignmentMapping = {
    // Common alignments for both HStack and VStack
    leading: 'flex-start',
    center: 'center',
    trailing: 'flex-end',
    spaceBetween: 'space-between',
    spaceAround: 'space-around',
    spaceEvenly: 'space-evenly',
  };
  
  // Mapping for cross-axis alignment (alignItems)
  const crossAxisAlignmentMapping = {
    // For HStack (vertical alignment)
    top: 'flex-start',
    center: 'center',
    bottom: 'flex-end',
    stretch: 'stretch',
  
    // For VStack (horizontal alignment)
    leading: 'flex-start',
    //center: 'center',
    trailing: 'flex-end',
    //stretch: 'stretch',
  };
  
  export { mainAxisAlignmentMapping, crossAxisAlignmentMapping };
  