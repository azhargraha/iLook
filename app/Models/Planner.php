<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Planner extends Model
{
    use HasFactory;
    protected $table = 'planner';
    protected $primaryKey = 'planID';
    protected $fillable = [
        'nama',
        'start_at',
        'end_at',
    ];
}
