var data = [] //stores user data

//Fill table
function Fill_table(){
    if(Array.isArray(data)){
        //Save in local
        localStorage.setItem("__data__", JSON.stringify(data))
        
        //Jquery code (clear the line to include the new data)
        $("#table_data tbody").html("")

        data.forEach(function(e){
            //Template string
            $("#table_data tbody").append(`
                <tr> 
                    <td>${e.Id}</td> 
                    <td>${e.First_name}</td> 
                    <td>${e.Last_name}</td> 
                    <td>${e.Birth_date}</td>
                    <td> 
                        <button type="button" class="btn btn-primary" onclick="javascript:Edit(${e.Id});">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg> 
                        </button> 
                    </td>
                    <td>
                        <button type="button" class="btn btn-danger" onclick="javascript:Drop(${e.Id});"> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg> 
                        </button>
                    </td>
                </tr>
            `)
        })
    }
}

//Drop register
function Drop(id){
    let _confirm = confirm("Are you sure about that?")

    if(_confirm){
        for(let i=0; i<data.length; i++){
            if(data[i].Id == id){
                data.splice(i,1)
            }
        }
        Fill_table()
    }
}

//Edit register
function Edit(id){
    $("#login").modal("show")
    data.forEach(function(e){
        if(e.Id == id){
            $("#id_hidden").val(e.Id)
            $("#txt_fname").val(e.First_name)
            $("#txt_lname").val(e.Last_name)
            $("#birth_date").val(e.Birth_date.substr(6,4) +"-"+ e.Birth_date.substr(3,2) +"-"+ e.Birth_date.substr(0,2))
        }
    })    
}

$(function(){
    //Execute at load page
    data = JSON.parse(localStorage.getItem("__data__"))
    
    if(data){
        Fill_table()
    }

    $("#save").click(function(){
        //Click event (data input)
        let id_hidden = $("#id_hidden").val()
        let fname = $("#txt_fname").val()
        let lname = $("#txt_lname").val()
        let birth_date = new Date($("#birth_date").val()).toLocaleString("pt-BR", {timeZone: "UTC"})
        birth_date = birth_date.substr(0,10)

        if(fname != "" && lname != "" && birth_date != ""){
            //I prefer to include an extra "if" for organizational purposes
            if(!id_hidden || id_hidden == "0"){
                let register = {}

                //Filling in data
                //Without database, an organizational number is generated for the element
                register.First_name = fname
                register.Last_name = lname
                register.Birth_date = birth_date

                //sets the id for the record
                register.Id = data.length + 1

                //Add new occurrence
                data.push(register)
            }else{
                data.forEach(function(e){
                    if(e.Id == id_hidden){
                        e.First_name = fname
                        e.Last_name = lname
                        e.Birth_date = birth_date
                    }
                })
            }

            alert("Saved successfully!")
            $("#login").modal("hide")

            //Clear data for a next input
            //I left "0" to keep track
            $("#id_hidden").val("0")
            $("#txt_fname").val("")
            $("#txt_lname").val("")
            $("#birth_date").val("")

            Fill_table()
        }else{
            $(".modal-body").append("<div class='alert alert-danger' role='alert'>Fill in all fields!</div>")
        }
    })
})