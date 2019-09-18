<template>
    <div class="row">
        <div class="col-xs-12" style="display: flex">
            <span class="progressbar-start-label">&nbsp;{{iStartLabel}}</span> 
            <span class="progressbar-container">
                <span class="progress-bar progressbar-bar-bg" :style="{'backgroundColor': iColorBg}"></span>
                <span class="progress-bar progressbar-bar-progress" :style="{'backgroundColor': iColor, 'width': (iValue || 0)}"></span>
            </span>
            <span class="progressbar-end-label">&nbsp;{{iEndLabel}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'progressBar',
    props: ['iColorBg', 'iColor', 'iStartLabel', 'iEndLabel', 'iValue']
}
</script>

<style>
.progressbar-start-label{
    font-size: 14px;
    align-items: center;
}

.progressbar-container{
    position: relative;
    display: flex;
    flex-grow: 1;
    margin: 0 2px;
    align-items: center;
}

.progress-bar{
    height: 10px;
    border-radius: 5px;
    position: absolute;
}

.progressbar-bar-bg{
    background-color: gray;
    width: 100%;
}

.progressbar-bar-progress{
    background-color: #00ca32;
    width: 0;
}

.progressbar-end-label{
    align-items: center;
    font-size: 14px;    
}

.col-xs-12{
    padding: 0;
}
</style>
