<?php

namespace App\Models;

use App\Models\Kategori;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pariwisata extends Model
{
    use HasFactory;
    protected $table = 'pariwisata';
    protected $primaryKey ='wisataID';
    protected $fillable = [
        'nama',
        'kategoriID',
        'harga',
        'lokasi',
        'deskripsi',
        'rating',
        'urlGambar',
    ];

    protected $with = ['kategori'];
    public function kategori(){
        return $this->belongsTo(Kategori::class, 'kategoriID', 'id');
    }
}
