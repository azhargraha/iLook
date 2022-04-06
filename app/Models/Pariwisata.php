<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pariwisata extends Model
{
    private $id, $namaPariwisata, $kategori, $harga, $latitude, $longitude, $rating;
    use HasFactory;
    protected $fillable = [
        'namaPariwisata',
        'kategori',
        'harga',
        'latitude',
        'longitude',
        'rating',
    ];

    public function addPariwisata(int $id, string $namaPariwisata, string $kategori, int $harga, string $latitude, string $longitude, float $rating){
        $this->$id = $id;
        $this->$namaPariwisata = $namaPariwisata;
        $this->$kategori = $kategori;
        $this->$harga = $harga;
        $this->$latitude = $latitude;
        $this->$longitude = $longitude;
        $this->$rating = $rating;
    }

    public function editPariwisata(string $namaPariwisata, string $kategori, int $harga, string $latitude, string $longitude){
        $this->$namaPariwisata = $namaPariwisata;
        $this->$kategori = $kategori;
        $this->$harga = $harga;
        $this->$latitude = $latitude;
        $this->$longitude = $longitude;
    }

    public function deletePariwisata(){
        $this->$id = NULL;
        $this->$namaPariwisata = NULL;
        $this->$kategori = NULL;
        $this->$harga = NULL;
        $this->$latitude = NULL;
        $this->$longitude = NULL;
        $this->$rating = NULL;
    }

    public function setLokasi($apiKey, $address){
        $lokasi = urlencode($address);
        $url = 'https://maps.googleapis.com/maps/api/geocode/json?address='.$address.'key='.$apiKey;
        $resp = json_decode( file_get_contents( $url ), true );
        $this->$latitude = $resp['results'][0]['geometry']['location']['lat'] ?? '';
        $this->$longitude = $resp['results'][0]['geometry']['location']['lng'] ?? '';
    }

    public function getLokasi($apiKey){
        $url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='.$this->$latitude.','.$this->$longitude.'&sensor=false';
        $resp = json_decode(file_get_contents($url), true);
        $lokasi = $resp->results[0]->formatted_address;
        return $lokasi;
    }

    public function getDataPariwisata(){
        return [
            'id'=> $this->$id,
            'namaPariwisata' => $this->$namaPariwisata,
            'kategori' => $this->$kategori,
            'harga' => $this->$harga,
            'lokasi' => $this->$lokasi,
            'rating' => $this->$rating
        ];
    }
}
