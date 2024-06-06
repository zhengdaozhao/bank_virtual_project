
export default function Pan({cfxback}){
    return (
        <>
            <input
            type="text"
            name="cardno"
            placeholder="credit card number"
            defaultValue={"未採番"}
            style={{backgroundColor:'yellow'}}
            />
            <button 
              type="button"
              style={{backgroundColor:'red',color:'white'}}
              onClick={()=>cfxback()}
            >
              採番
            </button>            
        </>
    )
}