$(document).ready(function() {
    $('#result').hide();

    var fruits = [];
    $.get("../JSON/fruit.json").success(function(data){
        fruits = data;
        $.each(fruits, function(index) {
            $('.fruit-select').append(
                '<option value="' + fruits[index].id + '">' + fruits[index].name + '</option>'
            );
        });
    });

    $('.fruit-select').select2({
        width: '300px',
        maximumSelectionLength: 3
    });

    $("#fresh-request").submit(function(e) {
        e.preventDefault();
        var name = $("input[name=name]").val();
        var email = $("input[name=email]").val();
        var phone = $("input[name=phone]").val();
        var description = $("textarea[name=description]").val();
        var fruit_selected = $('.fruit-select').val();

        var carbohydrates = 0;
        var protein = 0;
        var fat = 0;
        var calories = 0;
        var sugar = 0;

        var fruit_names = '';

        for (const fruit of fruits) {
            if (fruit_selected.includes(fruit.id.toString())) {
                carbohydrates += fruit.nutritions.carbohydrates;
                protein += fruit.nutritions.protein;
                fat += fruit.nutritions.fat;
                calories += fruit.nutritions.calories;
                sugar += fruit.nutritions.sugar;
                fruit_names += fruit.name + ', ';
            }
        }

        fruit_names = fruit_names.slice(0, -2);
        Number.prototype.padLeft = function(base,chr){
            var  len = (String(base || 10).length - String(this).length)+1;
            return len > 0? new Array(len).join(chr || '0')+this : this;
        }
        var d = new Date, dformat = [
                d.getDate(),
                d.getMonth()+1,
                d.getFullYear()].join('/')+' '+
            [d.getHours().padLeft(),
                d.getMinutes().padLeft(),
                d.getSeconds().padLeft()].join(':');

        $('#fresh-result').html(`
                    <p style="margin: 0 0 10px;"><b>Request Date:</b> ${dformat}</p>
                    <p style="margin: 0 0 10px;"><b>Name:</b> ${name}</p>
                    <p style="margin: 0 0 10px;"><b>Email:</b> ${email}</p>
                    <p style="margin: 0 0 10px;"><b>Phone:</b> ${phone}</p>
                    <p style="margin: 0 0 10px;"><b>Fruits:</b> ${fruit_names}</p>
                    <p style="margin: 0 0 10px;"><b>Description:</b> ${description}</p>
                    <br>
                    <p style="margin: 0 0 10px;"><b>Total carbohydrates:</b> ${Math.round(carbohydrates * 100) / 100}</p>
                    <p style="margin: 0 0 10px;"><b>Total protein:</b> ${Math.round(protein * 100) / 100}</p>
                    <p style="margin: 0 0 10px;"><b>Total fat:</b> ${Math.round(fat * 100) / 100}</p>
                    <p style="margin: 0 0 10px;"><b>Total calories:</b> ${Math.round(calories * 100) / 100}</p>
                    <p style="margin: 0 0 10px;"><b>Total sugar:</b> ${Math.round(sugar * 100) / 100}</p>
                    <br>
                    <button class="submitBtn" onclick="location.reload()">Make another order</button>
                `);

        $('#form').hide();
        $('#result').show();
    });
});