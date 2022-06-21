<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaketPariwisata extends Model
{
    use HasFactory;
    protected $table = 'paket_pariwisata_list';
    protected $primaryKey ='ID';
    protected $fillable = [
        'wisataID',
        'paketID'
    ];
}
