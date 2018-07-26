import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'
import geojson from 'json-loader!./lanus.geojson';
import axios from 'axios';

export default class SimpleExample extends Component {

  constructor(props){
    super(props);
    this.state = {
      lat: -34.64235943,
      lng: -60.46995009,
      zoom: 16,
      open: false,
      geojson:null,
      parcela:null
    }
    this.onEachFeature = this.onEachFeature.bind(this);
  }

  getStyle(feature, layer) {
    return {
      color: '#006400',
      weight: 2,
      opacity: 0.65
    }
  }

  onEachFeature(feature, layer) {
    var context = this;
    layer.on({
      click: function(event) {
        console.log(feature);
        console.log(context)
        context.setState({parcela:feature})
      }
    });
  }

  componentWillMount(){
    var service_url = 'http://192.168.150.142:8080/geoserver/catastro/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=catastro:parcela_registro_grafico_provincial&maxFeatures=100&outputFormat=application%2Fjson';
    //var service_url = 'http://192.168.150.142:8080/geoserver/catastro/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=catastro:parcela_registro_grafico_provincial&outputFormat=application%2Fjson';
    axios.get(service_url)
    .then(data=>{
      this.setState({geojson:JSON.parse(data.request.response)})
    }).catch(error=>{
      console.log(error.stack)
    })
  }

  render() {
    const position = [this.state.lat, this.state.lng]

    if(!this.state.geojson){
      return(<div>Loading map...</div>)
    }

    //return(<div>{this.state.geojson}</div>)
    return (
      <div>
        <div>
          <Map center={position} zoom={this.state.zoom}>
            <TileLayer
              url='http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
            />
            <GeoJSON data={this.state.geojson} style={this.getStyle} onEachFeature={this.onEachFeature} />
          </Map>
        </div>
        <div className='text-center 'style={{display:(this.state.parcela)?'inherit':'none'}}>
          <h1>Info de la parcela: </h1>
          <br/>
          <label>Layer: </label>
          {(this.state.parcela)?(this.state.parcela.properties.layer) : (null)}
          <br/>
          <label>Id de la parcela: </label>
          {(this.state.parcela)?(this.state.parcela.properties.id) : (null)}
          <br/>
          <label>Etiqueta: </label>
          {(this.state.parcela)?(this.state.parcela.properties.etiqueta) : (null)}
          <br/>
          <label>Nomenclatura: </label>
          {(this.state.parcela)?(this.state.parcela.properties.nomencla) : (null)}
          <br/>
        </div>
      </div>
    )
  }
}