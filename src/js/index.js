$(function() {
    

    $.ajax({
        url : 'api/swiper',
        dataType : "json",
        success : function(res) {
            console.log(res)
            if(res.code === 1) {
                
                renderSwiper(res.data)
            }
        }
    })

    function renderSwiper(data) {
        var str = "";
        data.forEach((item) => {
            str += `
            <div class="swiper-slide">`
            str += renderIcon(item.list)
            str += `</div>
            `
        })

        $(".swiper-wrapper").html(str)
        new Swiper(".swiper-container")
    }

    function renderIcon(list) {
        return list.map((item) => {
            return `
            <dl>
                <dt><img src="${item.url}"></dt>
                <dd>${item.title}</dd>
            </dl>
            `
        }).join("")
    }
})
